import { createUnionType } from '@nestjs/graphql'
import { Ok } from 'src/commons/results/ok.result'
import { UserAlreadyExists } from '../results/userAlreadyExists.result'

export const CreateUserResultUnion = createUnionType( {
    name  : 'CreateUserResultUnion',
    types : () => [ Ok, UserAlreadyExists ],
} )
