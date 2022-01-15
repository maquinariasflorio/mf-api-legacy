import { ObjectType, Field } from '@nestjs/graphql'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Schema as MongooseSchema, ObjectId } from 'mongoose'
import { Role } from '../role/role.schema'

@ObjectType()
@Schema( {
    collection : 'user',
    timestamps : true,
} )
export class User {

    @Field( () => String)
    _id: ObjectId;

    @Field( () => String)
    @Prop()
    rut: string;

    @Field( () => String)
    @Prop()
    email: string;

    @Field( () => String)
    @Prop()
    name: string;

    @Field( () => String)
    @Prop()
    password: string;

    @Field( () => Boolean)
    @Prop()
    isActive: boolean;

    @Field( () => String)
    @Prop( { type: MongooseSchema.Types.ObjectId, ref: 'Role' } )
    role: Role;

    @Field( () => Boolean)
    @Prop()
    isSystemAdmin: boolean;

    @Field( () => String, { nullable: true } )
    @Prop()
    signature?: string;

}

export type UserDocument = User & Document;

export const UserSchema = SchemaFactory.createForClass(User)
