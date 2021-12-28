import { createUnionType } from '@nestjs/graphql'
import { Ok } from 'src/commons/results/ok.result'
import { BookingNotFound } from '../results/bookingNotFound.result'

export const UpdateBookingResultUnion = createUnionType( {
    name  : 'UpdateBookingResultUnion',
    types : () => [ Ok, BookingNotFound ],
} )
