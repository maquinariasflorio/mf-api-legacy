import { Field, InputType } from '@nestjs/graphql'
import { AllowedMachineryType } from '../machinery.schema'

@InputType()
export class MachineryJobRegistryInput {

    @Field( { nullable: true } )
    _id?: string;

    @Field()
    date: string;

    @Field()
    equipment: string;

    @Field()
    operator: string;

    @Field( { nullable: true } )
    startHourmeter?: number;

    @Field( { nullable: true } )
    endHourmeter?: number;

    @Field( { nullable: true } )
    totalHours?: number;

    @Field( { nullable: true } )
    client?: string;

    @Field( { nullable: true } )
    building?: string;

    @Field( { nullable: true } )
    workCondition?: string;

    @Field( { nullable: true } )
    bookingWorkCondition?: string;

    @Field( { nullable: true } )
    load?: string;

    @Field( { nullable: true } )
    totalTravels?: number;

    @Field( { nullable: true } )
    workingDayType?: string;

    @Field( { nullable: true } )
    observations?: string;

    @Field( { nullable: true } )
    signature?: string;

    @Field( () => AllowedMachineryType, { nullable: true } )
    machineryType?: AllowedMachineryType;

    @Field()
    address: string;

}
