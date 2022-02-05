import { ObjectType, Field } from '@nestjs/graphql'
import { AllowedWorkCondition } from 'src/modules/booking/booking.schema'
import { Client } from 'src/modules/client/client.schema'
import { Equipment, Operator } from 'src/modules/machinery/results/fullMachineryJobRegistry.result'

@ObjectType()
export class GeneralPayStateMachinery {

    @Field( () => Client)
    client: Client;

    @Field( () => String)
    building: string;

    @Field( () => Operator)
    operator: typeof Operator;

    @Field( () => Equipment)
    equipment: typeof Equipment;

    @Field( () => Number)
    amountPerUse: number;

    @Field( () => Number)
    hours: number;

    @Field( () => Number)
    minHours: number;

    @Field( () => Number)
    toFacture: number;

    @Field( () => Number)
    totalAmount: number;

    @Field( () => Date)
    date: Date;

    @Field( () => String)
    folio: string;

    @Field( () => String, { nullable: true } )
    amounType?: string;

}

@ObjectType()
export class GeneralPayStateTruck {

    @Field( () => Client)
    client: Client;

    @Field( () => String)
    building: string;

    @Field( () => Operator)
    operator: typeof Operator;

    @Field( () => Equipment)
    equipment: typeof Equipment;

    @Field( () => Number)
    volume: number;

    @Field( () => String, { nullable: true } )
    load?: string;

    @Field( () => String, { nullable: true } )
    origin?: string;

    @Field( () => Number)
    totalTravels: number;

    @Field( () => String)
    workingDayType: string;

    @Field( () => Number)
    totalAmount: number;

    @Field( () => Number)
    amountPerUse: number;

    @Field( () => AllowedWorkCondition)
    workCondition: AllowedWorkCondition;

    @Field( () => Date)
    date: Date;

    @Field( () => String)
    folio: string;

    @Field( () => String, { nullable: true } )
    amounType?: string;

}

@ObjectType()
export class GeneralPayStateEquipments {

    @Field( () => [ GeneralPayStateMachinery ] )
    OTHER: GeneralPayStateMachinery[];

    @Field( () => [ GeneralPayStateTruck ] )
    TRUCK: GeneralPayStateTruck[];

}

@ObjectType()
export class GeneralPayStateReport {

    @Field( () => GeneralPayStateEquipments)
    intern: GeneralPayStateEquipments;

    @Field( () => GeneralPayStateEquipments)
    extern: GeneralPayStateEquipments;

}
