import { ObjectType, Field, registerEnumType } from '@nestjs/graphql'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Schema as MongooseSchema, ObjectId } from 'mongoose'
import { User } from '../user/user.schema'

export enum AllowedMachineryFuelType {
    RECHARGE = 'RECHARGE',
    BUY = 'BUY',
    RECHARGE_OTHERS = 'RECHARGE_OTHERS',
}

registerEnumType(AllowedMachineryFuelType, {
    name: 'AllowedMachineryFuelType',
} )

@ObjectType()
@Schema( {
    collection : 'ma_fuel_registry',
    timestamps : true,
} )
export class MachineryFuelRegistry {

    @Field( () => String)
    _id: ObjectId;

    @Field( () => Date)
    @Prop()
    date: Date;

    @Field( () => AllowedMachineryFuelType)
    @Prop()
    type: AllowedMachineryFuelType;

    @Field( () => String, { nullable: true } )
    @Prop( { type: MongooseSchema.Types.Mixed } )
    equipment?: any;

    @Field( () => String, { nullable: true } )
    @Prop( { type: MongooseSchema.Types.Mixed } )
    operator?: any;

    @Field( { nullable: true } )
    @Prop()
    hourmeter?: number;

    @Field( () => Number)
    @Prop()
    count: number;

    @Field( () => Number, { nullable: true } )
    @Prop()
    guia?: number;

    @Field( () => String)
    @Prop()
    time: string;

    @Field( () => String, { nullable: true } )
    @Prop()
    previousRegistry?: string;

    @Field( () => User, { nullable: true } )
    @Prop( { type: MongooseSchema.Types.Mixed } )
    executor?: User;

}

export type MachineryFuelRegistryDocument = MachineryFuelRegistry & Document;

export const MachineryFuelRegistrySchema = SchemaFactory.createForClass(MachineryFuelRegistry)
