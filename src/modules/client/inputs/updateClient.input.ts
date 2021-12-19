import { Field, InputType } from '@nestjs/graphql'
import { ClientInput } from './client.input'

@InputType()
export class UpdateClientInput extends ClientInput {

    @Field()
    _id: string;

}
