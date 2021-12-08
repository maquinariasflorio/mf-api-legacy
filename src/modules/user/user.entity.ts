import { Entity, Column, ObjectIdColumn } from 'typeorm'
import { ObjectId } from 'mongodb'

@Entity( {
    name: 'user',
} )
export class UserEntity {

    @ObjectIdColumn()
    _id: ObjectId;

    @Column()
    rut: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    isActive: boolean;

}
