import { createUnionType } from '@nestjs/graphql'
import { Ok } from '../../../commons/results/ok.result'
import { TokenNotFound } from '../../token/results/tokenNotFound.result'
import { InactiveUser } from '../../user/results/inactiveUser.result'
import { UserNotFound } from '../../user/results/userNotFound.result'
import { WrongChangePasswordCode } from '../results/wrongChangePassCode.result'
import { WrongCurrentPassword } from '../results/wrongCurrentPassword.result'

export const ChangePasswordResultUnion = createUnionType( {
    name  : 'ChangePasswordResultUnion',
    types : () => [ Ok, UserNotFound, InactiveUser, TokenNotFound, WrongChangePasswordCode, WrongCurrentPassword ],
} )
