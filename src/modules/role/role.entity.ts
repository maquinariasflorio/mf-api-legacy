import { Entity, Column, ObjectIdColumn } from 'typeorm'
import { ObjectId } from 'mongodb'

@Entity( {
    name: 'role',
} )
export class RoleEntity {

    @ObjectIdColumn()
    _id: ObjectId;

    @Column()
    name: string;

    @Column()
    label: string;

    @Column()
    allowedViews: Array<{
        name: string,
        actions?: Array<string>
    }>;

}
