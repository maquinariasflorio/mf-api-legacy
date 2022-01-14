import { forwardRef, Module } from '@nestjs/common'
import { MachineryService } from './machinery.service'
import { MachineryResolver } from './machinery.resolver'
import { MongooseModule } from '@nestjs/mongoose'
import { Machinery, MachinerySchema } from './machinery.schema'
import { BookingModule } from '../booking/booking.module'
import { UserModule } from '../user/user.module'
import { RoleModule } from '../role/role.module'
import { MachineryJobRegistry, MachineryJobRegistrySchema } from './machineryJobRegistry.schema'
import { MachineryFuelRegistry, MachineryFuelRegistrySchema } from './machineryFuelRegistry.schema'
import { MachineryMaintenance, MachineryMaintenanceSchema } from './machineryMaintenance.schema'
import { ClientModule } from '../client/client.module'
import { CounterModule } from '../counter/counter.module'

@Module( {
    imports: [
        MongooseModule.forFeature( [
            { name: Machinery.name, schema: MachinerySchema },
            { name: MachineryJobRegistry.name, schema: MachineryJobRegistrySchema },
            { name: MachineryFuelRegistry.name, schema: MachineryFuelRegistrySchema },
            { name: MachineryMaintenance.name, schema: MachineryMaintenanceSchema },
        ] ),

        UserModule,
        RoleModule,
        ClientModule,
        CounterModule,
        forwardRef( () => BookingModule),
    ],

    providers : [ MachineryService, MachineryResolver ],
    exports   : [ MachineryService ],
} )
export class MachineryModule {}
