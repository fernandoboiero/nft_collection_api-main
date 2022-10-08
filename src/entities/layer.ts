import {Field, ID, ObjectType} from "type-graphql"
import {ObjectId} from "mongoose"
import {prop, Ref} from "@typegoose/typegoose"
import {MCollection} from "./collection"
import {Image} from "./image"

@ObjectType()
export class Layer {

    @Field(() => ID, {nullable: true})
    _id?: ObjectId

    @prop()
    @Field()
    name: string;

    @prop()
    @Field()
    index: number;

    @prop()
    @Field(() => Boolean, {defaultValue: false})
    isRare: boolean;

    @prop({ref: () => Image})
    @Field(() => [Image])
    images: Ref<Image>[];

    @prop({ref: () => MCollection})
    @Field(() => MCollection)
    mcollection: Ref<MCollection>

}
