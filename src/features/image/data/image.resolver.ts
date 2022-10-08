import {FieldResolver, Query, Resolver, Root} from "type-graphql"
import {ImageModel, LayerModel} from "../../../core/initialize-models"
import {Ref} from "@typegoose/typegoose"
import {Image} from "../../../entities/image"


@Resolver(Image)
export default class ImageResolver {

    @Query(() => [Image])
    async getAllImages() {
        return ImageModel.find()
    }

    @FieldResolver()
    async layer(@Root() image: Ref<Image>) {
        return LayerModel.findById((image as Image).layer)
    }


}
