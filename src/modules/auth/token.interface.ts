import { JwtPayload } from 'jsonwebtoken'

export interface TokenPayloadInterface extends JwtPayload {
    data: TokenDataInterface,
    iat: number,
    exp: number,
}

export interface TokenDataInterface {
    userId: string,
    cdn: string,
    tenantId: string,
    isActive: boolean,
}
