import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ViewEntity } from './view.entity'
import { ViewService } from './view.service'

@Module( {
    imports: [
        TypeOrmModule.forFeature( [ ViewEntity ] ),
    ],

    providers : [ ViewService ],
    exports   : [ ViewService ],
} )
export class ViewModule {}
