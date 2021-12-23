import { ObjectType, Field } from '@nestjs/graphql'

@ObjectType()
export class CodeAlreadyExists {

    @Field()
    code: string;

    constructor(data?: { code: string } ) {

        this.code = data?.code
    
    }

}
