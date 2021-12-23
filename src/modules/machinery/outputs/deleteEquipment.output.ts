import { createUnionType } from '@nestjs/graphql'
import { Ok } from 'src/commons/results/ok.result'
import { EquipmentNotFound } from '../results/equipmentNotFound.result'

export const DeleteEquipmentResultUnion = createUnionType( {
    name  : 'DeleteEquipmentResultUnion',
    types : () => [ Ok, EquipmentNotFound ],
} )
