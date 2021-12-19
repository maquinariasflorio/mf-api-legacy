import { createUnionType } from '@nestjs/graphql'
import { Ok } from 'src/commons/results/ok.result'

export const CreateClientResultUnion = createUnionType( {
    name  : 'CreateClientResultUnion',
    types : () => [ Ok ],
} )
