import {Field, ID, ObjectType} from "type-graphql"
import {Layer} from "./layer"
import {prop, Ref} from "@typegoose/typegoose"
import {ObjectId} from "mongoose"

@ObjectType()
export class MCollection {

    @Field(() => ID, {nullable: true})
    _id?: ObjectId

    @prop()
    @Field()
    name: string

    @prop()
    @Field()
    detail: string

    @prop()
    @Field()
    authorName: string

    @prop()
    @Field()
    authorEmail: string

    @prop()
    @Field({nullable: true})
    banner: string

    @prop({ref: () => Layer})
    @Field(() => [Layer])
    layers: Ref<Layer>[]

}


