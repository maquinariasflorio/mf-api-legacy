import { ObjectType, Field } from '@nestjs/graphql'
import { Client } from 'src/modules/client/client.schema'
import { Equipment, Operator } from 'src/modules/machinery/results/fullMachineryJobRegistry.result'

@ObjectType()
export class DailyPayStateReport {

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

    @Field( () => String)
    amounType: string;

    @Field( () => Number)
    hours: number;

    @Field( () => Number)
    minHours: number;

    @Field( () => Number)
    toFacture: number;

    @Field( () => Number)
    totalAmount: number;

}
