import { Field, InputType } from '@nestjs/graphql'
import { AllowedMachineryType } from 'src/modules/machinery/machinery.schema'
import { AllowedBookingType, AllowedWorkCondition } from '../booking.schema'

@InputType()
export class BookingMachineryInput {
    
    @Field( () => AllowedMachineryType)
    machineryType: AllowedMachineryType;

    @Field()
    equipment: string;

    @Field()
    operator: string;

    // MACHINERY CASE

    @Field( { nullable: true } )
    minHours?: number;

    @Field( { nullable: true } )
    amountPerHour?: number;

    // TRUCK CASE

    @Field( () => AllowedWorkCondition, { nullable: true } )
    workCondition?: AllowedWorkCondition;

    @Field( { nullable: true } )
    amountPerTravel?: number;

    @Field( { nullable: true } )
    amountPerDay?: number;
    
}

@InputType()
export class BookingReceiverInput {
    
    @Field( () => Boolean)
    editable: boolean;

    @Field( () => String)
    email: string;
    
}

@InputType()
export class BookingInput {

    @Field( { nullable: true } )
    _id?: string;

    @Field( () => AllowedBookingType)
    type: AllowedBookingType;

    @Field( { nullable: true } )
    constructionManager?: string;

    @Field()
    client: string;

    @Field( () => [ BookingMachineryInput ] )
    machines: BookingMachineryInput[];

    // WORK DATA

    @Field( { nullable: true } )
    company?: string;

    @Field()
    building: string;

    @Field()
    startDate: Date;

    @Field()
    endDate: Date;

    @Field()
    address: string;

    @Field( () => [ BookingReceiverInput ] )
    receivers: BookingReceiverInput[];

}
