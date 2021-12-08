import { ObjectType, Field } from '@nestjs/graphql'

@ObjectType()
export class Ok {

    @Field( { nullable: true } )
    message?: string;

    constructor( { message }: { message?: string } ) {

        this.message = message
    
    }

}
