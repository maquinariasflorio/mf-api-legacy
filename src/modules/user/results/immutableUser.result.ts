import { ObjectType, Field } from '@nestjs/graphql'

@ObjectType()
export class ImmutableUser {

    @Field()
    _id?: string;

    @Field()
    rut?: string;

    constructor( { _id, rut }: { _id?: string, rut?: string } ) {

        this._id = _id
        this.rut = rut
    
    }

}
