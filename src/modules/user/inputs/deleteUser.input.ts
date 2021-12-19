import { Field, InputType } from '@nestjs/graphql'
import { UserInput } from './user.input'

@InputType()
export class DeleteUserInput extends UserInput {

    @Field()
    _id: string;

}
