import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class NewUserInput {

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
