import {buildSchema} from "type-graphql"
import LayerResolver from "../features/layer/data/layer.resolver"
import ImageResolver from "../features/image/data/image.resolver"
import CollectionResolver from "../features/collection/data/collection.resolver"

export const createSchema = () => buildSchema({
    // resolvers: [__dirname + "/../features/**/*.resolver.ts"],
    resolvers: [LayerResolver, ImageResolver, CollectionResolver]
});
