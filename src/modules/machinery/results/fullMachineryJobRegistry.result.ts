import { ObjectType, Field } from '@nestjs/graphql'
import { AllowedWorkCondition } from 'src/modules/booking/booking.schema'
import { Client } from 'src/modules/client/client.schema'
import { AllowedMachineryType, Machinery } from 'src/modules/machinery/machinery.schema'
import { User } from 'src/modules/user/user.schema'

@ObjectType()
export class FullMachineryJobRegistry {
    
    @Field( () => String)
    _id: string;

    @Field( () => User)
    executor: User;

    @Field( () => Machinery)
    equipment: Machinery;

    @Field( () => Date)
    date: Date;

    @Field( () => Number, { nullable: true } )
    startHourmeter?: number;

    @Field( () => Number, { nullable: true } )
    endHourmeter?: number;

    @Field( () => Number, { nullable: true } )
    totalHours?: number;

    @Field( () => Client, { nullable: true } )
    client?: Client;

    @Field( () => String, { nullable: true } )
    building?: string;

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

}
