import { ObjectType, Field } from '@nestjs/graphql'
import { User } from 'src/modules/user/user.schema'
import { Equipment, Operator } from './fullMachineryJobRegistry.result'

@ObjectType()
export class FullMachineryFuelRegistry {
    
    @Field( () => String)
    _id: string;

    @Field( () => Number)
    count: number;

    @Field( () => Number, { nullable: true } )
    hourmeter?: number;

    @Field( () => Number, { nullable: true } )
    guia?: number;

    @Field( () => String)
    type: string;

    @Field( () => Equipment)
    equipment: typeof Equipment;

    @Field( () => Operator, { nullable: true } )
    operator?: typeof Operator;

    @Field( () => Date)
    date: Date;

    @Field( () => String)
    time: string;

    @Field( () => String, { nullable: true } )
    previousRegistry?: string;

    @Field( () => User, { nullable: true } )
    executor?: User;

}
