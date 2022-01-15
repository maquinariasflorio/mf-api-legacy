import { TokenType } from './type.enum'
import { enumToArray } from '../../helpers/enumToArray'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Schema as MongooseSchema, ObjectId } from 'mongoose'
import { ObjectType, Field } from '@nestjs/graphql'

@ObjectType()
@Schema( {
    collection : 'token',
    timestamps : true,
} )
export class Token {

    @Field( () => String)
    _id: ObjectId;

    @Field( () => String)
    @Prop( { type: MongooseSchema.Types.ObjectId } )
    userId: ObjectId;

    @Field( () => String)
    @Prop()
    token: string;

    @Field( () => TokenType)
    @Prop( {
        enum: enumToArray<string>(TokenType),
    } )
    type: string;

    @Field( () => Date)
    @Prop()
    expires: Date;

}

export type TokenDocument = Token & Document;

export const TokenSchema = SchemaFactory.createForClass(Token)
