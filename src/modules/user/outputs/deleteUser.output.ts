import { createUnionType } from '@nestjs/graphql'
import { Ok } from 'src/commons/results/ok.result'
import { ImmutableUser } from '../results/immutableUser.result'
import { UserNotFound } from '../results/userNotFound.result'

export const DeleteUserResultUnion = createUnionType( {
    name  : 'DeleteUserResultUnion',
    types : () => [ Ok, UserNotFound, ImmutableUser ],
} )
