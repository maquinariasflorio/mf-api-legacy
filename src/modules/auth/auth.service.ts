import { Injectable } from '@nestjs/common'
import { ObjectId } from 'mongodb'
import { MailerService } from '@nestjs-modules/mailer'
import { compareSync } from 'bcrypt'
import { MfError } from '../../commons/mfError'
import { AuthError } from './error.cv'
import { UserService } from '../user/user.service'
import { TokenService } from '../token/token.service'
import { TokenType } from '../token/type.enum'
import { RecoverCodeInput } from './inputs/recoverCode.input'
import { InactiveUser } from '../user/results/inactiveUser.result'
import { Ok } from '../../commons/results/ok.result'
import { NewPasswordInput } from './inputs/newPassword.input'
import { TokenNotFound } from '../token/results/tokenNotFound.result'
import { UserNotFound } from '../user/results/userNotFound.result'
import { WrongChangePasswordCode } from './results/wrongChangePassCode.result'
import { RoleService } from '../role/role.service'
import { RoleNotFound } from '../role/results/roleNotFound.result'
import { ViewService } from '../view/view.service'

@Injectable()
export class AuthService {

    constructor(
        private readonly mailerService: MailerService,
        private readonly userService: UserService,
        private readonly tokenService: TokenService,
        private readonly roleService: RoleService,
        private readonly viewService: ViewService,
    ) {}

    async login( { rut, password } ) {

        const user = await this.userService.findOneUser( { rut } )

        if (!user) {

            throw new MfError( {
                statusCode: 404,
                ...AuthError.USER_NOT_FOUND,
            } )
        
        }
        else if (!user.isActive) {

            throw new MfError( {
                statusCode: 403,
                ...AuthError.INACTIVE_USER,
            } )
        
        }
        else if (!compareSync(password, user.password) ) {

            throw new MfError( {
                statusCode: 401,
                ...AuthError.WRONG_PASSWORD,
            } )
        
        }

        const tokens = await this.tokenService.generateJwtTokens( { userId: user._id, userIsActive: user.isActive } )

        return { user, tokens }
    
    }

    async refreshTokens( { refreshTokenToFind, userId, userIsActive } ) {

        const refreshToken = await this.tokenService.findOneToken( { token: refreshTokenToFind, userId: new ObjectId(userId), type: TokenType.REFRESH } )

        if (!refreshToken) {

            throw new MfError( {
                statusCode: 404,
                ...AuthError.REFRESH_TOKEN_NOT_FOUND,
            } )
        
        }

        const tokens = await this.tokenService.generateJwtTokens( { userId: new ObjectId(userId), userIsActive } )

        return { tokens }
    
    }

    async logout(userId: string) {

        await this.tokenService.deleteMany( { userId: new ObjectId(userId), type: TokenType.REFRESH } )
    
    }

    async generateChangePasswordAuthCode(form: RecoverCodeInput) {

        const user = await this.userService.findOneUser( { rut: form.rut } )

        if (!user) {

            return new UserNotFound( {
                message: `User with rut '${form.rut}' not found'`,
            } )
        
        }
        else if (!user.isActive) {

            return new InactiveUser( {
                rut: form.rut,
            } )
        
        }

        const token = await this.tokenService.generateChangePasswordToken( { userId: user._id } )

        return await this.mailerService.sendMail( {
            to      : user.email.toLowerCase(),
            from    : `"No Reply" <${process.env.SMTP_USER}>`,
            subject : 'Maquinarias Florio - Código de autorización para cambio de contraseña',
            text    : `Código de autorización para cambio de contraseña: ${token.code}`,
            html    : `<p>Código de autorización para cambio de contraseña: ${token.code}</p>`,
        } )
            .then( () => {

                return new Ok( {
                    message: "Change password auth code generated and sent to the user's email",
                } )
            
            } )
    
    }

    async changePasswordWithAuthCode(form: NewPasswordInput) {

        const user = await this.userService.findOneUser( { rut: form.rut } )

        if (!user) {

            return new UserNotFound( {
                message: `User with rut '${form.rut}' not found`,
            } )
        
        }
        else if (!user.isActive) {

            return new InactiveUser( {
                rut: form.rut,
            } )
        
        }

        const token = await this.tokenService.findOneToken( { userId: user._id, type: TokenType.CHANGE_PASSWORD } )

        if (!token) {
            
            return new TokenNotFound( {
                message: `Change password token not found for user '${form.rut}'`,
            } )
        
        }

        const isCorrectCode = compareSync(form.code.trim(), token.token)
        if (!isCorrectCode) {

            return new WrongChangePasswordCode( {
                message: `The code sent is not valid`,
            } )
        
        }

        await this.userService.changePassword( { userId: user._id, password: form.password } )

        return await this.mailerService.sendMail( {
            to      : user.email.toLowerCase(),
            from    : `"No Reply" <${process.env.SMTP_USER}>`,
            subject : 'Maquinarias Florio - Cambio de contraseña',
            text    : '¡Cuidado! Su contraseña fue actualizada. Si usted no hizo esta operación, comuníquese de inmediato con su administrador.',
            html    : `<p>¡Cuidado! Su contraseña fue actualizada. Si usted no hizo esta operación, comuníquese de inmediato con su administrador.</p>`,
        } )
            .then( () => {

                return new Ok( {
                    message: "The password was updated correctly",
                } )
            
            } )
    
    }

    async getUser(id: string) {

        const user = await this.userService.findOneUser( { _id: new ObjectId(id) } )
        delete user.password

        const role = await this.roleService.findOneRole( { _id: user.role._id } )

        if (!role) {
            
            return new RoleNotFound( {
                message: 'Role not found',
            } )
        
        }

        const views = await this.viewService.find()

        return {
            ...user,
            role,
            views: this.getAllowedViews(views, role.allowedViews),
        }
    
    }

    getAllowedViews(views, allowedViews) {

        const allowed = []

        views.forEach(view => {

            if (allowedViews.find(allowedView => allowedView.name === view.name) ) {

                if (view.children) {

                    allowed.push( {
                        ...view,
                        children: this.getAllowedViews(view.children, allowedViews),
                    } )
                
                }
                else {

                    allowed.push(view)
                
                }
            
            }
        
        } )

        return allowed
    
    }

}
