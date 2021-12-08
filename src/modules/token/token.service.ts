import { InjectRepository } from '@nestjs/typeorm'
import { MongoRepository } from 'typeorm'
import * as moment from 'moment'
import { ObjectId } from 'mongodb'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { TokenType } from './type.enum'
import { JwtService } from '@nestjs/jwt'
import { TokenEntity } from './token.entity'
import { hashSync } from 'bcrypt'

@Injectable()
export class TokenService {

    constructor(
        @InjectRepository(TokenEntity)
        private tokensRepository: MongoRepository<TokenEntity>,
        private readonly configService: ConfigService,
        private readonly jwtService: JwtService,
    ) {}

    async findOneToken(conditions: Partial<TokenEntity> | string) {

        return await this.tokensRepository.findOne(conditions)
    
    }

    async deleteMany(conditions: Partial<TokenEntity>) {

        return await this.tokensRepository.deleteMany(conditions)
    
    }

    generateToken(type: TokenType, data: { userId: ObjectId, userIsActive: boolean }, secret: string, expires: moment.Moment): string {

        const payload = {
            sub: {
                userId       : data.userId.toHexString(),
                userIsActive : data.userIsActive,
            },

            iat : moment().unix(),
            exp : expires.unix(),
            type,
        }

        return this.jwtService.sign(payload, { secret } )
    
    }

    async generateJwtTokens(data: { userId: ObjectId, userIsActive: boolean } ): Promise<{ access: Token; refresh: Token; }> {

        await this.deleteMany( { userId: data.userId, type: TokenType.REFRESH } )

        const secret = this.configService.get('JWT_TOKEN_SECRET')

        const accessTokenExpires = moment().add(this.configService.get('JWT_ACCESS_TOKEN_EXPIRATION_TIME_IN_HOURS'), 'hours')
        const accessToken = this.generateToken(TokenType.ACCESS, data, secret, accessTokenExpires)

        const refreshTokenExpires = moment().add(this.configService.get('JWT_REFRESH_TOKEN_EXPIRATION_TIME_IN_HOURS'), 'hours')
        const refreshToken = this.generateToken(TokenType.REFRESH, data, secret, refreshTokenExpires)

        await this.tokensRepository.save( {
            userId  : data.userId,
            token   : refreshToken,
            type    : TokenType.REFRESH,
            expires : refreshTokenExpires.toDate(),
        } )

        return {
            access: {
                token   : accessToken,
                expires : accessTokenExpires.toDate(),
            },

            refresh: {
                token   : refreshToken,
                expires : refreshTokenExpires.toDate(),
            },
        }
    
    }

    codeGenerator() {

        let code = ""
        const possible = "0123456789"

        for (let i = 0; i < 6; i++)
            code += possible.charAt(Math.floor(Math.random() * possible.length) )
        

        return code
    
    }

    async generateChangePasswordToken(data: { userId: ObjectId } ): Promise<{ code: string; expires: Date; }> {

        await this.deleteMany( { userId: data.userId, type: TokenType.CHANGE_PASSWORD } )

        const tokenExpires = moment().add(this.configService.get('CHANGE_PASSWORD_TOKEN_EXPIRATION_TIME_IN_HOURS'), 'hours')
        const code = this.codeGenerator()

        await this.tokensRepository.save( {
            userId  : data.userId,
            token   : hashSync(code, 10),
            type    : TokenType.CHANGE_PASSWORD,
            expires : tokenExpires.toDate(),
        } )

        return {
            code,
            expires: tokenExpires.toDate(),
        }
    
    }

}

export interface Token {
    token: string,
    expires: Date,
}
