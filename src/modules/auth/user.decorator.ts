import { createParamDecorator } from '@nestjs/common'

export const CurrentUser = createParamDecorator(
    (_, request) => {

        return request.args[2].req.user.userId
    
    }
)
