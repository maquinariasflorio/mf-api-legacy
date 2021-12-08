import { ObjectType, Field } from '@nestjs/graphql'

@ObjectType()
export class InactiveUser {

    @Field()
    rut: string;

    constructor( { rut }: { rut: string } ) {

        this.rut = rut
    
    }

}
