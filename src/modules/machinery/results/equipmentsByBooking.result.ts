import { ObjectType, Field } from '@nestjs/graphql'
import { Machinery } from '../machinery.schema'

@ObjectType()
export class EquipmentForInternalBookings extends Machinery {

    @Field( () => String, { nullable: true } )
    workCondition?: string;
    
}

@ObjectType()
export class EquipmentsByBooking {

    @Field( () => [ EquipmentForInternalBookings ] )
    equipments: EquipmentForInternalBookings[];

    constructor(equipments) {

        this.equipments = equipments
    
    }

}

@ObjectType()
export class EquipmentForExternalBookings {
    
    @Field( () => String)
    _id: string;

    @Field( () => String)
    type: string;

    @Field( () => Number)
    minHours: number;

    @Field( () => String, { nullable: true } )
    workCondition?: string;
    
}


@ObjectType()
export class ExternalEquipmentsByBooking {

    @Field( () => [ EquipmentForExternalBookings ] )
    equipments: EquipmentForExternalBookings[];

    constructor(equipments) {

        this.equipments = equipments
    
    }

}
