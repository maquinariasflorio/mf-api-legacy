import { MigrationInterface } from "typeorm"
import { MongoQueryRunner } from "typeorm/driver/mongodb/MongoQueryRunner"

export class CreateInitialViews1639096324857 implements MigrationInterface {

    public async up(queryRunner: MongoQueryRunner): Promise<void> {

        await queryRunner.insertMany('view', [
            {
                name  : 'clients',
                label : 'Clientes',
                icon  : 'mdi-account-hard-hat',
            },
            {
                name  : 'staff',
                label : 'Personal',
                icon  : 'mdi-account-group',
            },
            {
                name  : 'operator-next-job',
                label : 'Siguiente trabajo',
                icon  : 'mdi-pipe-wrench',
            },
            {
                name     : 'machinery',
                label    : 'Maquinarias',
                icon     : 'mdi-dump-truck',
                children : [
                    {
                        name  : 'machinery-equipment',
                        label : 'Equipos',
                        icon  : 'mdi-truck-outline',
                    },
                    {
                        name  : 'machinery-job-registry',
                        label : 'Registro de Horómetro',
                        icon  : 'mdi-speedometer',
                    },
                    {
                        name  : 'machinery-fuel-registry',
                        label : 'Registro de Combustible',
                        icon  : 'mdi-fuel',
                    },
                    {
                        name  : 'machinery-maintenance',
                        label : 'Mantenimiento',
                        icon  : 'mdi-wrench-clock',
                    },
                ],
            },
            {
                name  : 'booking',
                label : 'Reservas',
                icon  : 'mdi-calendar-clock',
            },
            {
                name  : 'reports',
                label : 'Reportes',
                icon  : 'mdi-chart-line',
            },
            {
                name  : 'pay-states',
                label : 'Estados de Pago',
                icon  : 'mdi-credit-card-sync-outline',
            },
        ] )
    
    }

    public async down(queryRunner: MongoQueryRunner): Promise<void> {

        await queryRunner.deleteOne('view', { name: 'clients' } )
        await queryRunner.deleteOne('view', { name: 'staff' } )
        await queryRunner.deleteOne('view', { name: 'operator_next_job' } )
        await queryRunner.deleteOne('view', { name: 'machinery' } )
        await queryRunner.deleteOne('view', { name: 'machinery_job_registry' } )
        await queryRunner.deleteOne('view', { name: 'booking' } )
        await queryRunner.deleteOne('view', { name: 'reports' } )
        await queryRunner.deleteOne('view', { name: 'pay_states' } )
    
    }

}
