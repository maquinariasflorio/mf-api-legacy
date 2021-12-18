import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { Role, RoleSchema } from './role.schema'
import { RoleService } from './role.service'
import { RoleResolver } from './role.resolver';

@Module( {
    imports: [
        MongooseModule.forFeature( [{ name: Role.name, schema: RoleSchema }] ),
    ],

    providers : [ RoleService, RoleResolver ],
    exports   : [ RoleService ],
} )
export class RoleModule {}
