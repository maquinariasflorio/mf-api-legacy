import { ObjectType, Field } from '@nestjs/graphql'

@ObjectType()
export class ClientNotFound {

    @Field()
    message: string;

    constructor(data?: { message: string } ) {

        this.message = data?.message
    
    }

}
