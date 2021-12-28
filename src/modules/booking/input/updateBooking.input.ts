import { Field, InputType } from '@nestjs/graphql'
import { BookingInput } from './booking.input'

@InputType()
export class UpdateBookingInput extends BookingInput {

    @Field()
    _id: string;

}
