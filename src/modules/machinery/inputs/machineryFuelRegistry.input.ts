import { Field, InputType } from '@nestjs/graphql'
import { AllowedMachineryFuelType } from '../machineryFuelRegistry.schema'

@InputType()
export class MachineryFuelRegistryInput {

    @Field( { nullable: true } )
    _id?: string;

    @Field()
    date: string;

    @Field( () => AllowedMachineryFuelType)
    type: AllowedMachineryFuelType;

    @Field( { nullable: true } )
    equipment?: string;

    @Field( { nullable: true } )
    operator?: string;

    @Field( { nullable: true } )
    hourmeter?: number;

    @Field()
    count: number;

    @Field( { nullable: true } )
    guia?: number;

}
