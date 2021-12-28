import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class DeleteBookingInput {

    @Field()
    _id: string;

}
