import { Field, InputType } from '@nestjs/graphql'
import { UserInput } from './user.input'

@InputType()
export class UpdateUserInput extends UserInput {

    @Field()
    _id: string;

}
