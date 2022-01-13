import { ObjectType, Field, createUnionType } from '@nestjs/graphql'
import { AllowedWorkCondition } from 'src/modules/booking/booking.schema'
import { Client } from 'src/modules/client/client.schema'
import { AllowedMachineryType, Machinery } from 'src/modules/machinery/machinery.schema'
import { User } from 'src/modules/user/user.schema'

@ObjectType()
export class ExternalEquipment {

    @Field( () => String)
    name: string;

}

@ObjectType()
export class InternalEquipment extends Machinery {}

const Equipment = createUnionType( {
    name        : "Equipment",
    types       : () => [ ExternalEquipment, InternalEquipment ],
    resolveType : (value) => {

        if (value._id)
            return InternalEquipment
        
        return ExternalEquipment
    
    },
} )

@ObjectType()
export class ExternalOperator {

    @Field( () => String)
    name: string;

}

@ObjectType()
export class InternalOperator extends User {}

const Operator = createUnionType( {
    name        : "Operator",
    types       : () => [ ExternalOperator, InternalOperator ],
    resolveType : (value) => {

        if (value._id)
            return InternalOperator
        
        return ExternalOperator
    
    },
} )

@ObjectType()
export class FullMachineryJobRegistry {
    
    @Field( () => String)
    _id: string;

    @Field( () => User)
    executor: User;

    @Field( () => Equipment)
    equipment: typeof Equipment;

    @Field( () => Operator)
    operator: typeof Operator;

    @Field( () => Date)
    date: Date;

    @Field( () => Number, { nullable: true } )
    startHourmeter?: number;

    @Field( () => Number, { nullable: true } )
    endHourmeter?: number;

    @Field( () => Number, { nullable: true } )
    totalHours?: number;

    @Field( () => Client)
    client: Client;

    @Field( () => String)
    building: string;

    @Field( () => AllowedWorkCondition, { nullable: true } )
    workCondition?: AllowedWorkCondition;

    @Field( () => AllowedWorkCondition, { nullable: true } )
    bookingWorkCondition?: AllowedWorkCondition;

    @Field( () => String, { nullable: true } )
    load?: string;

    @Field( () => Number, { nullable: true } )
    totalTravels?: number;

    @Field( () => String, { nullable: true } )
    workingDayType?: string;

    @Field( () => String, { nullable: true } )
    observations?: string;

    @Field( () => String, { nullable: true } )
    signature?: string;

    @Field( () => AllowedMachineryType, { nullable: true } )
    machineryType?: AllowedMachineryType;

    @Field( () => Number)
    folio: number;

    @Field( () => String)
    address: string;

}
