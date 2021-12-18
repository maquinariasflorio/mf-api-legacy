module.exports = {
    async up(db, client) {

        await db.collection('view').insertMany( [
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
                    },
                    {
                        name  : 'machinery-job-registry',
                        label : 'Registro de uso',
                    },
                    {
                        name  : 'machinery-fuel-registry',
                        label : 'Registro de combustible',
                    },
                    {
                        name  : 'machinery-maintenance',
                        label : 'Mantenimiento',
                    },
                ],
            },
            {
                name  : 'booking',
                label : 'Reservas',
                icon  : 'mdi-calendar-clock',
            },
            {
                name     : 'reports',
                label    : 'Reportes',
                icon     : 'mdi-chart-line',
                children : [
                    {
                        name  : 'report-daily',
                        label : 'Resumen de uso diario',
                    },
                    {
                        name  : 'report-external-equipment',
                        label : 'Equipos externos',
                    },
                    {
                        name  : 'report-equipment',
                        label : 'Reporte de equipos',
                    },
                    {
                        name  : 'report-fuel',
                        label : 'Reporte de combustible',
                    },
                    {
                        name  : 'report-maintenance',
                        label : 'Reporte de mantenimiento',
                    },
                ],
            },
            {
                name     : 'pay-states',
                label    : 'Estados de Pago',
                icon     : 'mdi-credit-card-sync-outline',
                children : [
                    {
                        name  : 'pay-states-machinery',
                        label : 'Maquinaria',
                    },
                    {
                        name  : 'pay-states-truck-by-travels',
                        label : 'Camión por viajes',
                    },
                    {
                        name  : 'pay-states-truck-by-day',
                        label : 'Camión por jornada',
                    },
                    {
                        name  : 'pay-states-daily',
                        label : 'Resumen diario',
                    },
                ],
            },
        ] )
    
    },

    async down(db, client) {

        await db.collection('view').deleteMany( {
            name: {
                $in: [
                    'clients',
                    'staff',
                    'operator-next-job',
                    'machinery',
                    'booking',
                    'reports',
                    'pay-states',
                ],
            },
        } )
    
    },
}
