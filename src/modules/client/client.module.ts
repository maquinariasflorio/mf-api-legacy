import { Module } from '@nestjs/common'
import { ClientService } from './client.service'
import { ClientResolver } from './client.resolver'
import { MongooseModule } from '@nestjs/mongoose'
import { Client, ClientSchema } from './client.schema'

@Module( {
    imports: [
        MongooseModule.forFeature( [{ name: Client.name, schema: ClientSchema }] ),
    ],

    providers : [ ClientService, ClientResolver ],
    exports   : [ ClientService ],
} )
export class ClientModule {}
