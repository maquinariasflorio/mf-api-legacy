import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable, UnauthorizedException } from '@nestjs/common'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor() {

        super( {
            jwtFromRequest   : ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey      : process.env.JWT_TOKEN_SECRET,
            ignoreExpiration : false,
        } )
    
    }

    async validate(payload) {

        if (payload.sub['userIsActive'] )
            return payload.sub
        

        throw new UnauthorizedException('Unauthorized')
    
    }

}
