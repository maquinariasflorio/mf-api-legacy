import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { AuthController } from './auth.controller'
import { AuthResolver } from './auth.resolver'
import { AuthService } from './auth.service'
import { JwtStrategy } from './jwt.strategy'
import { UserModule } from '../user/user.module'
import { TokenModule } from '../token/token.module'
import { RoleModule } from '../role/role.module'
import { ViewModule } from '../view/view.module'

@Module( {
    imports: [
        PassportModule.register( { defaultStrategy: 'jwt' } ),
        
        UserModule,
        TokenModule,
        RoleModule,
        ViewModule,
    ],

    providers   : [ AuthService, JwtStrategy, AuthResolver ],
    controllers : [ AuthController ],
    exports     : [],
} )
export class AuthModule {}
