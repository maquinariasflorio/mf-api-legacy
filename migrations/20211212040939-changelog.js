module.exports = {
    async up(db, client) {

        await db.createCollection('changelog')
    
    },

    async down(db, client) {

        await db.dropCollection('changelog')
    
    },
}
