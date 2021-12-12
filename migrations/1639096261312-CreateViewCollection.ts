import { MigrationInterface } from "typeorm"
import { MongoQueryRunner } from "typeorm/driver/mongodb/MongoQueryRunner"

export class CreateViewCollection1639096261312 implements MigrationInterface {

    public async up(queryRunner: MongoQueryRunner): Promise<void> {

        await queryRunner.createCollectionIndexes('view', [
            {
                key    : { name: 1 },
                name   : 'name_u',
                unique : true,
            },
        ] )
    
    }

    public async down(queryRunner: MongoQueryRunner): Promise<void> {

        await queryRunner.clearTable('view')
    
    }

}
