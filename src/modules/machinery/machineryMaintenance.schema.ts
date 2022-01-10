import { ObjectType, Field, registerEnumType } from '@nestjs/graphql'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { ObjectId } from 'mongodb'
import { Document, Schema as MongooseSchema } from 'mongoose'
import { MaintenanceMachineryClass } from './machinery.schema'

export enum MaintenanceStatus {
    PENDING = 'PENDING',
    DONE = 'DONE',
}

registerEnumType(MaintenanceStatus, {
    name: 'MaintenanceStatus',
} )

@ObjectType()
@Schema( {
    collection : 'ma_maintenance',
    timestamps : true,
} )
export class MachineryMaintenance {

    @Field( () => String)
    _id: ObjectId;

    @Field( () => Number)
    @Prop()
    uid: number;

    @Field( () => String)
    @Prop( { type: MongooseSchema.Types.ObjectId, ref: 'Machinery' } )
    equipment: ObjectId;

    @Field( () => MaintenanceMachineryClass)
    @Prop()
    maintenanceClass: MaintenanceMachineryClass;

    @Field( () => Number)
    @Prop()
    step: number;

    @Field( () => Number)
    @Prop()
    kmsOfMachinery: number;

    @Field( () => MaintenanceStatus, { nullable: true } )
    @Prop()
    status?: MaintenanceStatus;

}

export type MachineryMaintenanceDocument = MachineryMaintenance & Document;

export const MachineryMaintenanceSchema = SchemaFactory.createForClass(MachineryMaintenance)
