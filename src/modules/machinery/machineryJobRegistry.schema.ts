import { ObjectType, Field } from '@nestjs/graphql'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Schema as MongooseSchema, ObjectId } from 'mongoose'
import { AllowedWorkCondition } from '../booking/booking.schema'
import { Client } from '../client/client.schema'
import { AllowedMachineryType } from './machinery.schema'

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

    @Field( () => String)
    @Prop()
    equipment: string;

    @Field( () => Number, { nullable: true } )
    @Prop()
    startHourmeter?: number;

    @Field( () => Number, { nullable: true } )
    @Prop()
    endHourmeter?: number;

    @Field( () => Number, { nullable: true } )
    @Prop()
    totalHours?: number;

    @Field( () => String, { nullable: true } )
    @Prop( { type: MongooseSchema.Types.ObjectId, ref: 'Client' } )
    client?: Client;

    @Field( () => String, { nullable: true } )
    @Prop()
    building?: string;

    @Field( () => AllowedWorkCondition, { nullable: true } )
    @Prop()
    workCondition?: AllowedWorkCondition;

    @Field( () => String, { nullable: true } )
    @Prop()
    load?: string;

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

}

export type MachineryJobRegistryDocument = MachineryJobRegistry & Document;

export const MachineryJobRegistrySchema = SchemaFactory.createForClass(MachineryJobRegistry)
