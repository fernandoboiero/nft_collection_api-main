import {Field, InputType} from "type-graphql"
import {Length, MaxLength, IsEmail} from "class-validator"
import {CreateLayerInput} from "../../layer/domain/create_layer_input"


@InputType()
export class CreateCollectionInput {

    @Field()
    @Length(3, 50)
    name: string

    @Field()
    @Length(10, 100)
    detail: string

    @Field()
    @Length(3, 50)
    authorName: string

    @Field()
    @MaxLength(320)
    @IsEmail()
    authorEmail: string

    @Field()
    banner: string

    @Field(() => [CreateLayerInput], {nullable: true})
    layers: [CreateLayerInput]
}


