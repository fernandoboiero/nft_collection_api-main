import {Field, InputType} from "type-graphql"
import {CreateImageInput} from "../../image/domain/create_image_input"

@InputType()
export class CreateLayerInput {

    @Field()
    name: string

    @Field()
    index: number

    @Field()
    isRare: boolean

    @Field(() => [CreateImageInput])
    images: [CreateImageInput]

}


