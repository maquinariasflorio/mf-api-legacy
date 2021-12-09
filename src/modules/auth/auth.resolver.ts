import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { Public } from './public.decorator'
import { AuthService } from './auth.service'
import { RecoverCodeInput } from './inputs/recoverCode.input'
import { RecoverCodeResultUnion } from './outputs/recoverCode.output'
import { ChangePasswordResultUnion } from './outputs/changePassword.output'
import { NewPasswordInput } from './inputs/newPassword.input'

@Resolver()
export class AuthResolver {

    constructor(private readonly authService: AuthService) {}

    @Public()
    @Query( () => RecoverCodeResultUnion)
    async getRecoverCode(@Args('form') form: RecoverCodeInput) {
        
        return await this.authService.generateChangePasswordAuthCode(form)
    
    }

    @Public()
    @Mutation( () => ChangePasswordResultUnion)
    async changePasswordWithAuthCode(@Args('form') form: NewPasswordInput) {

        return await this.authService.changePasswordWithAuthCode(form)
    
    }

}
