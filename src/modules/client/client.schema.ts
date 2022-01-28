import { ObjectType, Field } from '@nestjs/graphql'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, ObjectId } from 'mongoose'

@ObjectType()
export class Billing {
    
    @Field( () => String)
    @Prop()
    name: string;

    @Field( () => String)
    @Prop()
    rut: string;

    @Field( () => String)
    @Prop()
    category: string;

    @Field( () => String)
    @Prop()
    address: string;

    @Field( () => String)
    @Prop()
    phone: string;

}

@ObjectType()
@Schema( {
    collection : 'client',
    timestamps : true,
} )
export class Client {

    @Field( () => String)
    _id: ObjectId;

    @Field( () => String)
    @Prop()
    name: string;

    @Field( () => String)
    @Prop()
    paymentCondition: string;

    @Field( () => [ String ] )
    @Prop()
    receivers: string[];

    @Field( () => Billing)
    @Prop( { type: Billing } )
    billing: Billing;

}

export type ClientDocument = Client & Document;

export const ClientSchema = SchemaFactory.createForClass(Client)
