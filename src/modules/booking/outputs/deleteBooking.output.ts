import { createUnionType } from '@nestjs/graphql'
import { Ok } from 'src/commons/results/ok.result'
import { BookingNotFound } from '../results/bookingNotFound.result'

export const DeleteBookingResultUnion = createUnionType( {
    name  : 'DeleteBookingResultUnion',
    types : () => [ Ok, BookingNotFound ],
} )
