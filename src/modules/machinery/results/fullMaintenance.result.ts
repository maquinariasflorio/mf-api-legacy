import { ObjectType, Field } from '@nestjs/graphql'
import { Machinery, MaintenanceMachineryClass } from 'src/modules/machinery/machinery.schema'
import { MaintenanceStatus } from '../machineryMaintenance.schema'

@ObjectType()
export class FullMaintenance {
    
    @Field( () => String)
    _id: string;

    @Field( () => Number)
    uid: number;

    @Field( () => Machinery)
    equipment: Machinery;

    @Field( () => MaintenanceMachineryClass)
    maintenanceClass: MaintenanceMachineryClass;

    @Field( () => Number)
    step: number;

    @Field( () => Number)
    kmsOfMachinery: number;

    @Field( () => MaintenanceStatus, { nullable: true } )
    status?: MaintenanceStatus;

}
