import { MigrationInterface } from "typeorm"
import { MongoQueryRunner } from "typeorm/driver/mongodb/MongoQueryRunner"

export class CreateTokenCollection1638993539644 implements MigrationInterface {

    public async up(queryRunner: MongoQueryRunner): Promise<void> {

        await queryRunner.createCollectionIndexes('token', [
            {
                key    : { token: 1, user: 1, type: 1 },
                name   : 'token_per_user_u',
                unique : true,
            },
            {
                key                : { expires: 1 },
                name               : 'expires_index',
                expireAfterSeconds : 0,
            },
        ] )
    
    }

    public async down(queryRunner: MongoQueryRunner): Promise<void> {

        await queryRunner.clearTable('token')
    
    }

}
