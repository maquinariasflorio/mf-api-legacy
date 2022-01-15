module.exports = {
    async up(db, client) {

        await db.collection('role').insertMany( [
            {
                name  : 'administrator',
                label : 'Administrador',
            },
            {
                name  : 'operator',
                label : 'Operador',
            },
            {
                name  : 'supplier',
                label : 'Suministrador',
            },
            {
                name  : 'construction_manager',
                label : 'Jefe de Obra',
            },
        ] )
    
    },

    async down(db, client) {

        await db.collection('role').deleteMany( {
            name: {
                $in: [
                    'administrator',
                    'operator',
                    'supplier',
                    'construction_manager',
                ],
            },
        } )
    
    },
}
