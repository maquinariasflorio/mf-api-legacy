import { ObjectType, Field } from '@nestjs/graphql'

@ObjectType()
export class EquipmentAlreadyExists {

    @Field()
    _id: string;

    constructor(data?: { id: string } ) {

        this._id = data?.id
    
    }

}
