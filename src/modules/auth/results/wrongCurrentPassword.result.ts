import { ObjectType, Field } from '@nestjs/graphql'

@ObjectType()
export class WrongCurrentPassword {

    @Field()
    message: string;

    constructor( { message }: { message: string } ) {

        this.message = message
    
    }

}
