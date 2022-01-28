import { createUnionType } from '@nestjs/graphql'
import { Ok } from 'src/commons/results/ok.result'
import { MachineryFuelRegistryNotFound } from '../results/machineryFuelRegistryNotFound.result'

export const DeleteMachineryFuelRegistryResultUnion = createUnionType( {
    name  : 'DeleteMachineryFuelRegistryResultUnion',
    types : () => [ Ok, MachineryFuelRegistryNotFound ],
} )
