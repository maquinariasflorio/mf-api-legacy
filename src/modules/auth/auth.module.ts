import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthController } from './auth.controller'
import { AuthResolver } from './auth.resolver'
import { AuthService } from './auth.service'
import { JwtStrategy } from './jwt.strategy'
import { TokenEntity } from './../token/token.entity'
import { UserModule } from '../user/user.module'
import { TokenModule } from '../token/token.module'

@Module( {
    imports: [
        PassportModule.register( { defaultStrategy: 'jwt' } ),
        TypeOrmModule.forFeature( [ TokenEntity ] ),
        
        UserModule,
        TokenModule,
    ],

    providers   : [ AuthService, JwtStrategy, AuthResolver ],
    controllers : [ AuthController ],
    exports     : [],
} )
export class AuthModule {}
