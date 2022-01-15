import { createUnionType } from '@nestjs/graphql'
import { Ok } from 'src/commons/results/ok.result'
import { CodeAlreadyExists } from '../results/codeAlreadyExists.result'
import { PatentAlreadyExists } from '../results/patentAlreadyExists.result'

export const CreateEquipmentResultUnion = createUnionType( {
    name  : 'CreateEquipmentResultUnion',
    types : () => [ Ok, CodeAlreadyExists, PatentAlreadyExists ],
} )
