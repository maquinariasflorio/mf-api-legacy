import { createUnionType } from '@nestjs/graphql'
import { Ok } from 'src/commons/results/ok.result'
import { ClientNotFound } from '../results/clientNotFound.result'

export const DeleteClientResultUnion = createUnionType( {
    name  : 'DeleteClientResultUnion',
    types : () => [ Ok, ClientNotFound ],
} )
