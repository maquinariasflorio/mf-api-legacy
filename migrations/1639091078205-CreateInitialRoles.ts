import { MigrationInterface } from "typeorm"
import { MongoQueryRunner } from "typeorm/driver/mongodb/MongoQueryRunner"

export class CreateInitialRoles1639091078205 implements MigrationInterface {

    public async up(queryRunner: MongoQueryRunner): Promise<void> {

        await queryRunner.insertMany('role', [
            {
                name  : 'administrator',
                label : 'Administrador',
            },
            {
                name  : 'mechanic',
                label : 'Mecánico',
            },
            {
                name  : 'operator',
                label : 'Operador',
            },
            {
                name  : 'supplier',
                label : 'Suministrador',
            },
        ] )
    
    }

    public async down(queryRunner: MongoQueryRunner): Promise<void> {

        await queryRunner.deleteOne('role', { name: 'administrator' } )
        await queryRunner.deleteOne('role', { name: 'mechanic' } )
        await queryRunner.deleteOne('role', { name: 'operator' } )
        await queryRunner.deleteOne('role', { name: 'supplier' } )
    
    }

}
