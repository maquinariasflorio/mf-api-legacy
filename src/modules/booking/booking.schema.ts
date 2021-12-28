import { ObjectType, Field, registerEnumType } from '@nestjs/graphql'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Schema as MongooseSchema, ObjectId } from 'mongoose'
import { Client } from '../client/client.schema'
import { User } from '../user/user.schema'
import { AllowedMachineryType, Machinery } from '../machinery/machinery.schema'

export enum AllowedBookingType {
    INTERNAL = 'INTERNAL',
    EXTERNAL = 'EXTERNAL',
}

registerEnumType(AllowedBookingType, {
    name: 'AllowedBookingType',
} )

export enum AllowedWorkCondition {
    TRAVEL = 'TRAVEL',
    DAY = 'DAY',
    BOTH = 'BOTH',
}

registerEnumType(AllowedWorkCondition, {
    name: 'AllowedWorkCondition',
} )

@ObjectType()
export class BookingReceiver {

    @Field( () => Boolean)
    @Prop()
    editable: boolean;

    @Field( () => String)
    @Prop()
    email: string;

}

@ObjectType()
@Schema( {
    collection : 'booking',
    timestamps : true,
} )
export class Booking {

    @Field( () => String)
    _id: ObjectId;

    @Field( () => AllowedBookingType)
    @Prop()
    type: AllowedBookingType;

    @Field( () => String, { nullable: true } )
    @Prop( { type: MongooseSchema.Types.Mixed } )
    constructionManager?: any;

    @Field( () => AllowedMachineryType)
    @Prop()
    machineryType: AllowedMachineryType;

    @Field( () => String)
    @Prop( { type: MongooseSchema.Types.ObjectId, ref: 'Client' } )
    client: Client;

    @Field( () => String)
    @Prop( { type: MongooseSchema.Types.Mixed } )
    equipment: any;

    @Field( () => String)
    @Prop( { type: MongooseSchema.Types.Mixed } )
    operator: any;

    // MACHINERY CASE

    @Field( () => Number, { nullable: true } )
    @Prop()
    minHours?: number;

    @Field( () => Number, { nullable: true } )
    @Prop()
    amountPerHour?: number;

    // TRUCK CASE

    @Field( () => AllowedWorkCondition, { nullable: true } )
    @Prop()
    workCondition?: AllowedWorkCondition;

    // WORK DATA

    @Field( () => String, { nullable: true } )
    @Prop()
    company?: string;

    @Field( () => String)
    @Prop()
    building: string;

    @Field( () => Date)
    @Prop()
    startDate: Date;

    @Field( () => Date)
    @Prop()
    endDate: Date;

    @Field( () => String)
    @Prop()
    address: string;

    @Field( () => [ BookingReceiver ] )
    @Prop( [{ type: BookingReceiver }] )
    receivers: BookingReceiver[];

}

export type BookingDocument = Booking & Document

export const BookingSchema = SchemaFactory.createForClass(Booking)
