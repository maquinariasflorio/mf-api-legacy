import { ObjectType, Field } from '@nestjs/graphql'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Schema as MongooseSchema, ObjectId } from 'mongoose'
import { AllowedWorkCondition } from '../booking/booking.schema'
import { Client } from '../client/client.schema'
import { User } from '../user/user.schema'
import { AllowedMachineryType, Machinery } from './machinery.schema'

@ObjectType()
@Schema( {
    collection : 'ma_job_registry',
    timestamps : true,
} )
export class MachineryJobRegistry {

    @Field( () => String)
    _id: ObjectId;

    @Field( () => Date)
    @Prop()
    date: Date;

    @Field( () => Machinery)
    @Prop( { type: MongooseSchema.Types.Mixed } )
    equipment: any;

    @Field( () => User)
    @Prop( { type: MongooseSchema.Types.Mixed } )
    operator: any;

    @Field( () => Number, { nullable: true } )
    @Prop()
    startHourmeter?: number;

    @Field( () => Number, { nullable: true } )
    @Prop()
    endHourmeter?: number;

    @Field( () => Number, { nullable: true } )
    @Prop()
    totalHours?: number;

    @Field( () => Client)
    @Prop( { type: MongooseSchema.Types.Mixed } )
    client: Client;

    @Field( () => String)
    @Prop()
    building: string;

    @Field( () => AllowedWorkCondition, { nullable: true } )
    @Prop()
    workCondition?: AllowedWorkCondition;

    @Field( () => AllowedWorkCondition, { nullable: true } )
    @Prop()
    bookingWorkCondition?: AllowedWorkCondition;

    @Field( () => String, { nullable: true } )
    @Prop()
    load?: string;

    @Field( () => String, { nullable: true } )
    @Prop()
    origin?: string;

    @Field( () => Number, { nullable: true } )
    @Prop()
    totalTravels?: number;

    @Field( () => String, { nullable: true } )
    @Prop()
    workingDayType?: string;

    @Field( () => String, { nullable: true } )
    @Prop()
    observations?: string;

    @Field( () => String, { nullable: true } )
    @Prop()
    signature?: string;

    @Field( () => AllowedMachineryType, { nullable: true } )
    @Prop()
    machineryType?: AllowedMachineryType;

    @Field( () => User)
    @Prop( { type: MongooseSchema.Types.Mixed } )
    executor: User;

    @Field( () => Number)
    @Prop()
    folio?: number;

    @Field( () => String)
    @Prop()
    address: string;

}

export type MachineryJobRegistryDocument = MachineryJobRegistry & Document;

export const MachineryJobRegistrySchema = SchemaFactory.createForClass(MachineryJobRegistry)
