import {Field, ID, ObjectType} from "type-graphql"
import {Layer} from "./layer"
import {ObjectId} from "mongoose"
import {prop} from "@typegoose/typegoose"

@ObjectType()
export class Image {

    @Field(() => ID, {nullable: true})
    _id?: ObjectId;

    @Field()
    @prop()
    name: string;

    @prop()
    @Field()
    mimeType: string;

    @prop()
    @Field()
    path: string;

    @prop()
    @Field()
    layerIndex: number;

    @prop({ref: () => Layer})
    @Field(() => Layer)
    layer: Layer;

}
