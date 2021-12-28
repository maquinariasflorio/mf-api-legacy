import { Field, InputType } from '@nestjs/graphql'
import { AllowedMachineryType, MaintenanceMachineryClass } from '../machinery.schema'

@InputType()
export class EquipmentInput {

    @Field( { nullable: true } )
    _id?: string;

    @Field( () => AllowedMachineryType)
    type: AllowedMachineryType;

    @Field()
    name: string;

    @Field()
    code: string;

    @Field()
    brand: string;

    @Field()
    model: string;

    @Field()
    patent: string;

    @Field()
    year: number;

    @Field( { nullable: true } )
    volume?: number;

    @Field( () => MaintenanceMachineryClass, { nullable: true } )
    maintenanceClass?: MaintenanceMachineryClass;

}
