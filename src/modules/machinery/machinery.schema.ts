import { ObjectType, Field, registerEnumType } from '@nestjs/graphql'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, ObjectId } from 'mongoose'

export enum AllowedMachineryType {
    TRUCK,
    OTHER,
}

registerEnumType(AllowedMachineryType, {
    name: 'AllowedMachineryType',
} )

export enum MaintenanceMachineryClass {
    CLASS_A,
    CLASS_B,
}

registerEnumType(MaintenanceMachineryClass, {
    name: 'MaintenanceMachineryClass',
} )

@ObjectType()
@Schema( {
    collection : 'ma_equipment',
    timestamps : true,
} )
export class Machinery {

    @Field( () => String)
    _id: ObjectId;

    @Field( () => AllowedMachineryType)
    @Prop()
    type: AllowedMachineryType;

    @Field( () => String)
    @Prop()
    name: string;

    @Field( () => String)
    @Prop()
    code: string;

    @Field( () => String)
    @Prop()
    brand: string;

    @Field( () => String)
    @Prop()
    model: string;

    @Field( () => String)
    @Prop()
    patent: string;

    @Field( () => Number)
    @Prop()
    year: number;

    @Field( () => Number, { nullable: true } )
    @Prop()
    volume?: number;

    @Field( () => MaintenanceMachineryClass)
    @Prop()
    maintenanceClass: MaintenanceMachineryClass;

}

export type MachineryDocument = Machinery & Document;

export const MachinerySchema = SchemaFactory.createForClass(Machinery)
