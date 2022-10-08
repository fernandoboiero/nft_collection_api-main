import {Arg, Ctx, FieldResolver, Mutation, Query, Resolver, Root,} from "type-graphql"
import {CreateCollectionInput} from "../domain/create_collection_input"
import {MCollection} from "../../../entities/collection"
import {CollectionModel, ImageModel, LayerModel} from "../../../core/initialize-models"
import {Layer} from "../../../entities/layer"
import {Ref} from "@typegoose/typegoose"
import BucketManager from "../../../core/aws/bucket-manager"

const {v4: uuidv4} = require('uuid');

@Resolver(MCollection)
export default class CollectionResolver {

    @Query(() => [MCollection])
    async getCollections(@Arg("limit") limit: number, @Arg("skip") skip: number): Promise<MCollection[]> {
        return CollectionModel.find().limit(limit).skip(skip * limit).exec()
    }

    @Mutation(() => MCollection)
    async createCollection(@Arg("input") input: CreateCollectionInput, @Ctx() ctx: any) {
        let bucket: BucketManager = ctx.bucket
        let collection = new CollectionModel(input)
        let collectionBannerName = collection._id + "-" + Date.now().toString() + "-" + uuidv4() + ".png"
        collection.banner = await bucket.store(collectionBannerName, input.banner)
        collection.layers = []

        for (const inputLayer of input.layers) {
            let layer = await new LayerModel(inputLayer)
            layer.mcollection = collection
            layer.images = []
            await layer.save()

            for (const i of inputLayer.images) {
                let image = await new ImageModel(i)
                image.name = collection._id + "-" + Date.now().toString() + "-" + uuidv4() + ".png"
                image.layer = layer
                image.path = await bucket.store(image.name, i.base64)
                await image.save()
                layer.images.push(image)
            }

            await layer.save()


            collection.layers.push(layer)
        }

        return collection.save();
    }

    @Mutation(() => MCollection)
    async deleteCollection(@Arg("id") id: string, @Ctx() ctx: any) {
        let bucket: BucketManager = ctx.bucket
        let collection = await CollectionModel.findById(id)
        if (!collection) {
            throw new Error("Collection not found")
        }
        // delete banner image
        await bucket.delete(collection.banner)

        // get layers by collection
        let layers = await LayerModel.find({mcollection: collection})
        for (let layersKey in layers) {
            let layer = layers[layersKey]
            // get images by layer
            let images = await ImageModel.find({layer: layer})
            for (let imagesKey in images) {
                let image = images[imagesKey]
                if (image.path == "" || image.path == null) {
                    continue
                }
                // delete image
                await bucket.delete(image.path)
                await image.remove()
            }
            // delete layer
            await layer.remove()
        }
        // delete collection
        await collection.remove()
        return collection
    }

    @FieldResolver()
    async layers(@Root() collection: Ref<MCollection>): Promise<Layer[]> {
        return LayerModel.find({_id: {$in: (collection as MCollection).layers}})
    }

    // get collection
    @Query(() => MCollection)
    async getCollection(@Arg("id") id: string): Promise<MCollection | null> {
        return CollectionModel.findById(id)
    }
}
