import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class RecoverCodeInput {

    @Field()
    rut: string;

}
