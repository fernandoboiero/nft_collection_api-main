import "reflect-metadata"
import {ApolloServer} from "apollo-server-express"
import Express from "express"
import {createSchema} from "./core/create-schema"
import bodyParser from 'body-parser'
import {graphqlUploadExpress} from "graphql-upload"
import mongoose from "mongoose"
import BucketManager from "./core/aws/bucket-manager"

// // @ts-ignore
require("./core/initialize-models")

const PORT = process.env.PORT!!
const MONGO_URL = process.env.MONGO_URL!!

console.assert(PORT, "PORT is not defined")
console.assert(MONGO_URL, "MONGO_URL is not defined")

const main = async (): Promise<void> => {

    console.log(MONGO_URL)

    let bucketManager = new BucketManager()
    let result = await bucketManager.init()
    if (!result) {
        throw Error("Error initializing bucket")
    }

    const options = {
        useNewUrlParser: true, useUnifiedTopology: true
    } as any

    await mongoose.connect(MONGO_URL, options);

    const app = Express();
    app.use(Express.json({limit: '200mb'}))
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(graphqlUploadExpress());

    const schema = await createSchema()

    const server = new ApolloServer({
        schema,
        context: (_: any) => {
            return {
                bucket: bucketManager
            }
        },
    });

    server.start().then(() => {
        server.applyMiddleware({app})
        app.listen(PORT, () => {
            console.log(`Server started on http://localhost:${PORT}` + server.graphqlPath)
        });
    })

}

main().then()

