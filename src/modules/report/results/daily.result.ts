import { ObjectType, Field } from '@nestjs/graphql'

@ObjectType()
export class MachineryResume {

    @Field( () => String)
    equipment: string;

    @Field( () => String)
    building: string;

    @Field( () => String)
    operator: string;

    @Field( () => String)
    address: string;

    @Field( () => Number)
    startHourmeter: number;

    @Field( () => Number)
    endHourmeter: number;

    @Field( () => Number)
    totalHours: number;

    @Field( () => String)
    observations: string;

}

@ObjectType()
export class TruckResume {

    @Field( () => String)
    equipment: string;

    @Field( () => String)
    operator: string;

    @Field( () => Number)
    volume: number;

    @Field( () => String)
    building: string;

    @Field( () => String)
    address: string;

    @Field( () => String)
    load: string;

    @Field( () => Number)
    totalTravels: number;

    @Field( () => String)
    workingDayType: string;

    @Field( () => String)
    observations: string;

}

@ObjectType()
export class DailyEquipmentsResume {

    @Field( () => [ MachineryResume ] )
    machinery: MachineryResume[];

    @Field( () => [ TruckResume ] )
    trucks: TruckResume[];

}

@ObjectType()
export class DailyReport {

    @Field( () => DailyEquipmentsResume)
    intern: DailyEquipmentsResume;

    @Field( () => DailyEquipmentsResume)
    extern: DailyEquipmentsResume;

}
