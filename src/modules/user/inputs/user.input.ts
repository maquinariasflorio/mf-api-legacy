import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class UserInput {

    @Field( { nullable: true } )
    _id?: string;

    @Field()
    rut: string;

    @Field()
    email: string;

    @Field()
    name: string;

    @Field()
    role: string;

    @Field( { nullable: true } )
    signature?: string;

}
