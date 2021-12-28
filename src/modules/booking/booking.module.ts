import { Module } from '@nestjs/common'
import { BookingService } from './booking.service'
import { BookingResolver } from './booking.resolver'
import { MongooseModule } from '@nestjs/mongoose'
import { Booking, BookingSchema } from './booking.schema'

@Module( {
    imports: [
        MongooseModule.forFeature( [{ name: Booking.name, schema: BookingSchema }] ),
    ],

    providers: [ BookingService, BookingResolver ],
} )
export class BookingModule {}
