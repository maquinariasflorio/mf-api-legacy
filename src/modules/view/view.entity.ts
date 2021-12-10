import { Entity, Column, ObjectIdColumn } from 'typeorm'
import { ObjectId } from 'mongodb'

@Entity( {
    name: 'view',
} )
export class ViewEntity {

    @ObjectIdColumn()
    _id: ObjectId;

    @Column()
    name: string;

    @Column()
    label: string;

    @Column()
    icon: string;

    @Column()
    children?: Array<ViewEntity>;

}
