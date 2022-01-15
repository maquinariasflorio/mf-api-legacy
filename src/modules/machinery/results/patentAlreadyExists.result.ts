import { ObjectType, Field } from '@nestjs/graphql'

@ObjectType()
export class PatentAlreadyExists {

    @Field()
    patent: string;

    constructor(data?: { patent: string } ) {

        this.patent = data?.patent
    
    }

}
