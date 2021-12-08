import { Entity, Column, ObjectIdColumn } from 'typeorm'
import { ObjectId } from 'mongodb'
import { TokenType } from './type.enum'
import { enumToArray } from './../../helpers/enumToArray'

@Entity( {
    name: 'token',
} )
export class TokenEntity {

    @ObjectIdColumn()
    _id: ObjectId;

    @ObjectIdColumn()
    userId: ObjectId;

    @Column()
    token: string;

    @Column( {
        enum: enumToArray<string>(TokenType),
    } )
    type: string;

    @Column()
    expires: Date;

}
