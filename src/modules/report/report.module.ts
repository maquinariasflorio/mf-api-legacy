import { Module } from '@nestjs/common'
import { ReportService } from './report.service'
import { ReportResolver } from './report.resolver'
import { BookingModule } from '../booking/booking.module'
import { ClientModule } from '../client/client.module'
import { MachineryModule } from '../machinery/machinery.module'
import { UserModule } from '../user/user.module'

@Module( {
    imports: [
        UserModule,
        ClientModule,
        BookingModule,
        MachineryModule,
    ],

    providers: [ ReportService, ReportResolver ],
} )
export class ReportModule {}
