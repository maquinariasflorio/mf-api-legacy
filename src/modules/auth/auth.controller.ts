import { Controller, Get, Post, Res, Body } from '@nestjs/common'
import { AuthService } from './auth.service'
import { Payload } from './payload.decorator'
import { Public } from './public.decorator'

@Controller('auth')
export class AuthController {

    constructor(
		private readonly authService: AuthService,
    ) {}

    @Public()
	@Post('login')
    async login(@Res() res, @Body() body) {

        try {

		    const { user, tokens } = await this.authService.login(body)
            res.status(200).send( { user, tokens } )
        
        }
        catch (error) {

            const response = {
                statusCode   : error.statusCode || 500,
                internalCode : error.statusCode || 'auth-unknown-001',
                message      : error.message || 'An error occurred while trying to login.',
                stack        : error.stack || '',
            } as HttpResponse

            res.status(response.statusCode).send(response)
        
        }
    
    }

	@Get('user')
    async getUser(@Res() res, @Payload() payload) {

        try {

		    const user = await this.authService.getUser(payload.sub['userId'] )
            res.status(200).send( { user } )
        
        }
        catch (error) {

            const response = {
                statusCode   : error.statusCode || 500,
                internalCode : error.statusCode || 'auth-unknown-002',
                message      : error.message || 'An error occurred while trying to get user.',
                stack        : error.stack || '',
            } as HttpResponse

            res.status(response.statusCode).send(response)
        
        }
    
    }

    @Public()
	@Post('refresh-tokens')
	async refresh(@Res() res, @Body() body, @Payload() payload) {

	    try {

		    const { tokens } = await this.authService.refreshTokens( { refreshTokenToFind: body.refreshToken, ...payload.sub } )
	        res.status(200).send( { tokens } )
	    
	    }
	    catch (error) {

	        const response = {
	            statusCode   : error.statusCode || 500,
	            internalCode : error.statusCode || 'auth-unknown-003',
	            message      : error.message || 'An error occurred while trying to get new tokens.',
	            stack        : error.stack || '',
	        } as HttpResponse

	        res.status(response.statusCode).send(response)
	    
	    }
	
	}

	@Get('logout')
    async logout(@Res() res, @Payload() payload) {

        try {

            await this.authService.logout(payload.sub['userId'] )
            res.status(200).send()
        
        }
        catch (error) {

            const response = {
                statusCode   : error.statusCode || 500,
                internalCode : error.statusCode || 'auth-unknown-004',
                message      : error.message || 'An error occurred while trying to logout.',
                stack        : error.stack || '',
            } as HttpResponse

            res.status(response.statusCode).send(response)
        
        }
    
    }

}

export interface HttpResponse {
    statusCode: number,
    internalCode: string,
    message: string,
    stack: string,
}
