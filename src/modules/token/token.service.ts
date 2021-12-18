import * as moment from 'moment'
import { ObjectId } from 'mongodb'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { TokenType } from './type.enum'
import { JwtService } from '@nestjs/jwt'
import { Token, TokenDocument } from './token.schema'
import { hashSync } from 'bcrypt'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

@Injectable()
export class TokenService {

    constructor(
        @InjectModel(Token.name)
        private tokenModel: Model<TokenDocument>,
        private readonly configService: ConfigService,
        private readonly jwtService: JwtService,
    ) {}

    async findOneToken(conditions: Record<string, unknown>) {

        return await this.tokenModel.findOne(conditions).lean()
    
    }

    async deleteMany(conditions: Record<string, unknown>): Promise<Token> {

        return await this.tokenModel.deleteMany(conditions).lean()
    
    }

    generateToken(type: TokenType, data: { userId: ObjectId, userIsActive: boolean }, secret: string, expires: moment.Moment): string {

        const payload = {
            sub: {
                userId       : data.userId.toHexString(),
                userIsActive : data.userIsActive,
            },

            iat: moment().unix(),
            // FIXME fix the issue with the expiration time for graphql
            // exp : expires.unix(),
            type,
        }

        return this.jwtService.sign(payload, { secret } )
    
    }

    async generateJwtTokens(data: { userId: ObjectId, userIsActive: boolean } ): Promise<{ access: TokenInterface; refresh: TokenInterface; }> {

        const secret = this.configService.get('JWT_TOKEN_SECRET')

        const accessTokenExpires = moment().add(this.configService.get('JWT_ACCESS_TOKEN_EXPIRATION_TIME_IN_HOURS'), 'hours')
        const accessToken = this.generateToken(TokenType.ACCESS, data, secret, accessTokenExpires)

        const refreshTokenExpires = moment().add(this.configService.get('JWT_REFRESH_TOKEN_EXPIRATION_TIME_IN_HOURS'), 'hours')
        const refreshToken = this.generateToken(TokenType.REFRESH, data, secret, refreshTokenExpires)

        const newToken = new this.tokenModel( {
            userId  : data.userId,
            token   : refreshToken,
            type    : TokenType.REFRESH,
            expires : refreshTokenExpires.toDate(),
        } )
        
        await newToken.save()

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

        const newToken = new this.tokenModel( {
            userId  : data.userId,
            token   : hashSync(code, 10),
            type    : TokenType.CHANGE_PASSWORD,
            expires : tokenExpires.toDate(),
        } )

        await newToken.save()

        return {
            code,
            expires: tokenExpires.toDate(),
        }
    
    }

}

export interface TokenInterface {
    token: string,
    expires: Date,
}
