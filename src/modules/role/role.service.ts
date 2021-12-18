import { Model } from 'mongoose'
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Role, RoleDocument } from './role.schema'

@Injectable()
export class RoleService {

    constructor(
        @InjectModel(Role.name)
        private roleModel: Model<RoleDocument>
    ) {}

    async findRole(conditions?: Partial<Role>) {

        return await this.roleModel.find(conditions).lean()
    
    }
    
    async findOneRole(conditions: Partial<Role>) {

        return await this.roleModel.findOne(conditions).lean()
    
    }

}
