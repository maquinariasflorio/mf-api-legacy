import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class NewPasswordInput {

    @Field()
    rut: string;

    @Field()
    password: string;

    @Field()
    code: string;

}
