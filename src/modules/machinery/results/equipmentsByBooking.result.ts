import { ObjectType, Field } from '@nestjs/graphql'
import { Client } from 'src/modules/client/client.schema'
import { User } from 'src/modules/user/user.schema'
import { Machinery } from '../machinery.schema'

@ObjectType()
export class EquipmentForInternalBookings extends Machinery {

    @Field( () => String, { nullable: true } )
    workCondition?: string;

    @Field( () => Client)
    client: Client;

    @Field( () => String)
    building: string;

    @Field( () => User)
    operator: User;
    
    @Field( () => String)
    address: string;
    
    @Field( () => String, { nullable: true } )
    load?: string;
    
    @Field( () => String, { nullable: true } )
    origin?: string;

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

    @Field( () => Client)
    client: Client;

    @Field( () => String)
    building: string;

    @Field( () => String)
    operator: string;

    @Field( () => String)
    address: string;

    @Field( () => String, { nullable: true } )
    load?: string;
    
    @Field( () => String, { nullable: true } )
    origin?: string;

}


@ObjectType()
export class ExternalEquipmentsByBooking {

    @Field( () => [ EquipmentForExternalBookings ] )
    equipments: EquipmentForExternalBookings[];

    constructor(equipments) {

        this.equipments = equipments
    
    }

}
