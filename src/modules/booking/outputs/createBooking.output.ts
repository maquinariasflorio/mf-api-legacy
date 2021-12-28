import { createUnionType } from '@nestjs/graphql'
import { Ok } from 'src/commons/results/ok.result'

export const CreateBookingResultUnion = createUnionType( {
    name  : 'CreateBookingResultUnion',
    types : () => [ Ok ],
} )
