import { MigrationInterface } from "typeorm"
import { MongoQueryRunner } from "typeorm/driver/mongodb/MongoQueryRunner"

export class PopulateRolesWithAllowedViews1639099305459 implements MigrationInterface {

    public async up(queryRunner: MongoQueryRunner): Promise<void> {

        await queryRunner.updateOne('role', { name: 'administrator' }, {
            $set: {
                allowedViews: [
                    { name: 'clients', actions: [ 'insert', 'update', 'delete', 'view' ] },
                    { name: 'staff', actions: [ 'insert', 'update', 'delete', 'view' ] },
                    { name: 'machinery' },
                    { name: 'machinery-equipment', actions: [ 'insert', 'update', 'delete', 'view' ] },
                    { name: 'booking', actions: [ 'insert', 'update', 'delete', 'view' ] },
                    { name: 'reports', actions: [ 'insert', 'update', 'delete', 'view' ] },
                    { name: 'pay_states', actions: [ 'insert', 'update', 'delete', 'view' ] },
                ],

                initialView: 'reports',
            },
        } )

        await queryRunner.updateOne('role', { name: 'operator' }, {
            $set: {
                allowedViews: [
                    { name: 'operator-next-job' },
                    { name: 'machinery' },
                    { name: 'machinery-job-registry' },
                ],

                initialView: 'operator-next-job',
            },
        } )

        await queryRunner.updateOne('role', { name: 'supplier' }, {
            $set: {
                allowedViews: [
                    { name: 'machinery' },
                    { name: 'machinery-fuel-registry' },
                ],

                initialView: 'machinery-fuel-registry',
            },
        } )

        await queryRunner.updateOne('role', { name: 'mechanic' }, {
            $set: {
                allowedViews: [
                    { name: 'machinery' },
                    { name: 'machinery-maintenance' },
                ],

                initialView: 'machinery-maintenance',
            },
        } )

    }

    public async down(queryRunner: MongoQueryRunner): Promise<void> {

        const roles = [
            'administrator',
            'operator',
            'supplier',
            'mechanic',
        ]

        for (const role of roles) {

            await queryRunner.updateOne('role', { name: role }, {
                $unset: {
                    allowedViews : [],
                    initialView  : '',
                },
            } )
        
        }
    
    }

}
