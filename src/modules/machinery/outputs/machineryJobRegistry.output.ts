import { createUnionType } from '@nestjs/graphql'
import { Ok } from 'src/commons/results/ok.result'

export const MachineryJobRegistryResultUnion = createUnionType( {
    name  : 'MachineryJobRegistryResultUnion',
    types : () => [ Ok ],
} )
