import { createUnionType } from '@nestjs/graphql'
import { Ok } from 'src/commons/results/ok.result'
import { CodeAlreadyExists } from '../results/codeAlreadyExists.result'
import { EquipmentNotFound } from '../results/equipmentNotFound.result'
import { PatentAlreadyExists } from '../results/patentAlreadyExists.result'

export const UpdateEquipmentResultUnion = createUnionType( {
    name  : 'UpdateEquipmentResultUnion',
    types : () => [ Ok, EquipmentNotFound, CodeAlreadyExists, PatentAlreadyExists ],
} )
