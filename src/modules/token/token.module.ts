import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { JwtModule } from '@nestjs/jwt'
import { TokenService } from './token.service'
import { TokenEntity } from './token.entity'

@Module( {
    imports: [
        JwtModule.register( {} ),
        TypeOrmModule.forFeature( [ TokenEntity ] ),
    ],

    providers : [ TokenService ],
    exports   : [ TokenService ],
} )
export class TokenModule {}
