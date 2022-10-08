import {Arg, FieldResolver, Query, Resolver, Root} from "type-graphql"
import {Layer} from "../../../entities/layer"
import {CollectionModel, ImageModel, LayerModel} from "../../../core/initialize-models"
import {Ref} from "@typegoose/typegoose"


@Resolver(Layer)
export default class LayerResolver {

    @Query(() => [Layer])
    async getLayers(@Arg("page") page: number, @Arg("limit") limit: number) {
        return LayerModel.find().limit(limit).skip(page * limit)
    }


    @FieldResolver()
    async mcollection(@Root() _: Ref<Layer>) {
        return CollectionModel.find()
    }

    @FieldResolver()
    async images(@Root() layer: Ref<Layer>) {
        return ImageModel.find({_id: {$in: (layer as Layer).images}})
    }
}
