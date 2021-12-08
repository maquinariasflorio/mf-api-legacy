import { createParamDecorator } from "@nestjs/common"
import { decode } from "jsonwebtoken"
import { MfError } from "../../commons/mfError"

export const Payload = createParamDecorator( (_, request: any) => {

    let token: string

    if (request.args[0].url === '/auth/refresh-tokens') {

        token = request.args[0].body['refreshToken']
    
    }
    else {

        const { authorization: accessToken } = request.args[0].headers
        token = accessToken.slice(7)
    
    }

    try {

        const decoded = decode(token, { complete: true } )

        if (!decoded) {

            throw new MfError( {
                code    : 'AUTH_INVALID_TOKEN',
                message : 'Invalid token',
            } )
        
        }

        return decoded.payload
    
    }
    catch (error) {

        throw new MfError( {
            code    : 'PAYLOAD_ERROR',
            message : 'Error while decoding token',
        } )
    
    }

} )

export interface AuthUser {
    _id: string;
}
