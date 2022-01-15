import { ObjectType, Field } from '@nestjs/graphql'

@ObjectType()
export class Ok {

    @Field( { nullable: true } )
    message?: string;

    constructor(data?: { message?: string } ) {

        this.message = data?.message
    
    }

}
