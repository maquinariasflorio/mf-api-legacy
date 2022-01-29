/* eslint-disable @typescript-eslint/no-empty-function */
module.exports = {
    async up(db, client) {

        await db.collection('client').updateMany( {}, {
            $unset: {
                "billing.loads": 1,
            },
        } )
    
    },

    async down(db, client) {},
}
