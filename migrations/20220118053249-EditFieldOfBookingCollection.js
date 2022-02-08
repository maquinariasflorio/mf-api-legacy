module.exports = {
    async up(db, client) {

        const bookings = await db.collection('booking').find().toArray()

        for (const booking of bookings) {

            for (const machine of booking.machines) {

                machine.amountPerTravel = machine.amountPertravel || 0
                delete machine.amountPertravel
            
            }

            await db.collection('booking').updateOne( { _id: booking._id }, { $set: { machines: booking.machines } } )
        
        }
    
    },

    async down(db, client) {

        const bookings = await db.collection('booking').find().toArray()

        for (const booking of bookings) {

            for (const machine of booking.machines) {

                machine.amountPertravel = machine.amountPerTravel || 0
                delete machine.amountPerTravel
            
            }

            await db.collection('booking').updateOne( { _id: booking._id }, { $set: { machines: booking.machines } } )
        
        }
    
    },
}
