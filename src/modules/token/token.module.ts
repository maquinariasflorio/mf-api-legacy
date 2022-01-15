import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { TokenService } from './token.service'
import { Token, TokenSchema } from './token.schema'
import { MongooseModule } from '@nestjs/mongoose'

@Module( {
    imports: [
        JwtModule.register( {} ),
        MongooseModule.forFeature( [{ name: Token.name, schema: TokenSchema }] ),
    ],

    providers : [ TokenService ],
    exports   : [ TokenService ],
} )
export class TokenModule {}
