module.exports = {
    async up(db, client) {

        const administratorRole = await db.collection('role').findOne( { name: 'administrator' } )

        await db.collection('user').insertOne( {
            rut           : "1-9",
            name          : "Administrador",
            role          : administratorRole._id,
            email         : "",
            password      : "$2a$10$QmBYVGkPpxgqsoC.F6YuT.1BWn0ABhTEVh6y5MAcDE2/DADWZFt2C",
            isSystemAdmin : true,
            isActive      : true,
        } )
    
    },

    async down(db, client) {

        await db.collection('user').deleteOne( { rut: "1-9" } )
    
    },
}
