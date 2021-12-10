import { MigrationInterface } from "typeorm"
import { MongoQueryRunner } from "typeorm/driver/mongodb/MongoQueryRunner"

export class CreateRoleCollection1639090876227 implements MigrationInterface {

    public async up(queryRunner: MongoQueryRunner): Promise<void> {

        await queryRunner.createCollectionIndexes('role', [
            {
                key    : { name: 1 },
                name   : 'name_u',
                unique : true,
            },
        ] )
    
    }

    public async down(queryRunner: MongoQueryRunner): Promise<void> {

        await queryRunner.clearTable('role')
    
    }

}
