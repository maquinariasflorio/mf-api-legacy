import { Module } from '@nestjs/common'
import { MachineryService } from './machinery.service'
import { MachineryResolver } from './machinery.resolver'
import { MongooseModule } from '@nestjs/mongoose'
import { Machinery, MachinerySchema } from './machinery.schema'

@Module( {
    imports: [
        MongooseModule.forFeature( [{ name: Machinery.name, schema: MachinerySchema }] ),
    ],

    providers: [ MachineryService, MachineryResolver ],
} )
export class MachineryModule {}
