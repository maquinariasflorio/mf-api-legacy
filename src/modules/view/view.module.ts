import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { View, ViewSchema } from './view.schema'
import { ViewService } from './view.service'

@Module( {
    imports: [
        MongooseModule.forFeature( [{ name: View.name, schema: ViewSchema }] ),
    ],

    providers : [ ViewService ],
    exports   : [ ViewService ],
} )
export class ViewModule {}
