import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host'
import { GqlContextType, GqlExecutionContext } from '@nestjs/graphql'
import { AuthGuard } from '@nestjs/passport'
import { IS_PUBLIC_KEY } from './public.decorator'

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    
    constructor(private reflector: Reflector) {

        super()
    
    }

    handleRequest(err, user) {

        if (err || !user)
            throw err || new UnauthorizedException()
        

        return user
    
    }

    canActivate(context: ExecutionContext) {

        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ] )

        if (isPublic)
            return true

        if (context.getType<GqlContextType>() === 'graphql') {

            const ctx = GqlExecutionContext.create(context)
            const { req } = ctx.getContext()

            return super.canActivate(new ExecutionContextHost( [ req ] ) )
        
        }
            

        return super.canActivate(context)
    
    }

}
