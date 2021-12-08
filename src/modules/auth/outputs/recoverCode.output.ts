import { createUnionType } from '@nestjs/graphql'
import { Ok } from 'src/commons/results/ok.result'
import { InactiveUser } from '../../user/results/inactiveUser.result'
import { UserNotFound } from '../../user/results/userNotFound.result'

export const RecoverCodeResultUnion = createUnionType( {
    name  : 'RecoverCodeResultUnion',
    types : () => [ Ok, UserNotFound, InactiveUser ],
} )
