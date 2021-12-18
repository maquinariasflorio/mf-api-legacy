import { Query, Resolver } from '@nestjs/graphql'
import { Role } from './role.schema'
import { RoleService } from './role.service'

@Resolver()
export class RoleResolver {

    constructor(private readonly roleService: RoleService) {}

    @Query( () => [ Role ] )
    async getAllRoles() {

        return await this.roleService.findRole()
    
    }

}
