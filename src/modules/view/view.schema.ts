import { ObjectType, Field } from '@nestjs/graphql'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, ObjectId } from 'mongoose'

@ObjectType()
@Schema( {
    collection : 'view',
    timestamps : true,
} )
export class View {

    @Field( () => String)
    _id: ObjectId;

    @Field( () => String)
    @Prop()
    name: string;

    @Field( () => String)
    @Prop()
    label: string;

    @Field( () => String)
    @Prop()
    icon: string;

    @Field( () => [ View ] )
    @Prop()
    children?: Array<View>;

}

export type ViewDocument = View & Document;

export const ViewSchema = SchemaFactory.createForClass(View)
