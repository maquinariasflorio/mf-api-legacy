import { createUnionType } from '@nestjs/graphql'
import { Ok } from 'src/commons/results/ok.result'

export const MachineryFuelRegistryResultUnion = createUnionType( {
    name  : 'MachineryFuelRegistryResultUnion',
    types : () => [ Ok ],
} )
