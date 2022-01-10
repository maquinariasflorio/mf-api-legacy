import { createUnionType } from '@nestjs/graphql'
import { Ok } from 'src/commons/results/ok.result'
import { MachineryJobRegistryNotFound } from '../results/machineryJobRegistryNotFound.result'

export const UpdateMachineryJobRegistryResultUnion = createUnionType( {
    name  : 'UpdateMachineryJobRegistryResultUnion',
    types : () => [ Ok, MachineryJobRegistryNotFound ],
} )
