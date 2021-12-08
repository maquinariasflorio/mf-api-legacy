import { MigrationInterface } from "typeorm"
import { MongoQueryRunner } from "typeorm/driver/mongodb/MongoQueryRunner"

export class CreateUserCollection1638992209558 implements MigrationInterface {

    public async up(queryRunner: MongoQueryRunner): Promise<void> {

        await queryRunner.createCollectionIndexes('user',  [{
            key    : { rut: 1 },
            name   : 'rut_u',
            unique : true,
        }] )
    
    }

    public async down(queryRunner: MongoQueryRunner): Promise<void> {

        await queryRunner.clearTable('user')
    
    }

}
