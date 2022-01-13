import { ObjectType, Field } from '@nestjs/graphql'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, ObjectId } from 'mongoose'

@ObjectType()
@Schema( {
    collection : 'counter',
    timestamps : true,
} )
export class Counter {

    @Field( () => String)
    _id: ObjectId;

    @Field( () => String)
    @Prop()
    name: string;

    // MACHINERY_JOB_REGISTRY_FOLIO

    @Field( () => Number)
    @Prop()
    lastFolio?: number;

}

export type CounterDocument = Counter & Document;

export const CounterSchema = SchemaFactory.createForClass(Counter)
