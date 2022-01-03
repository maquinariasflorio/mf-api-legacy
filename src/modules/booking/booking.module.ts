import { Module } from '@nestjs/common'
import { BookingService } from './booking.service'
import { BookingResolver } from './booking.resolver'
import { MongooseModule } from '@nestjs/mongoose'
import { Booking, BookingSchema } from './booking.schema'
import { UserModule } from '../user/user.module'
import { RoleModule } from '../role/role.module'

@Module( {
    imports: [
        MongooseModule.forFeature( [{ name: Booking.name, schema: BookingSchema }] ),

        UserModule,
        RoleModule,
    ],

    providers : [ BookingService, BookingResolver ],
    exports   : [ BookingService ],
} )
export class BookingModule {}
