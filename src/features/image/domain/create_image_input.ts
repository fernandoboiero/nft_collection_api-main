import {Field, InputType} from "type-graphql"

@InputType()
export class CreateImageInput {

    @Field()
    name: string;

    @Field()
    mimeType: string;

    @Field()
    path: string;

    @Field()
    base64: string;

    @Field()
    layerIndex: number;

}


