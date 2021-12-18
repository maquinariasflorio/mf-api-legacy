import { ObjectType, Field } from '@nestjs/graphql'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, ObjectId } from 'mongoose'

@ObjectType()
@Schema( {
    collection : 'role',
    timestamps : true,
} )
export class Role {

    @Field( () => String)
    _id: ObjectId;

    @Field( () => String)
    @Prop()
    name: string;

    @Field( () => String)
    @Prop()
    label: string;

    @Prop( () => [{ name: String, actions: [ String ] }] )
    allowedViews: Array<{
        name: string,
        actions?: Array<string>
    }>;

    @Field( () => String)
    @Prop()
    initialView: string;

}

export type RoleDocument = Role & Document;

export const RoleSchema = SchemaFactory.createForClass(Role)
