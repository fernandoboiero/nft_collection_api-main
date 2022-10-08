import {Field, InputType} from "type-graphql"
import {Length, MaxLength, IsEmail} from "class-validator"

@InputType()
export class UpdateCollectionInput {

    @Field()
    @MaxLength(320)
    @IsEmail()
    authorEmail: string

    @Field()
    @Length(3, 50)
    authorName: string

    @Field()
    @Length(3, 50)
    name: string

    @Field()
    @Length(10, 100)
    detail: string
}
