import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class DeleteUserInput {

    @Field()
    _id: string;

}
