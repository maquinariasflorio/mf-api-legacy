import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { MongoRepository } from 'typeorm'
import { RoleEntity } from './role.entity'

@Injectable()
export class RoleService {

    constructor(
        @InjectRepository(RoleEntity)
        private rolesRepository: MongoRepository<RoleEntity>,
    ) {}

    async findRole(conditions: Partial<RoleEntity>) {

        return await this.rolesRepository.find(conditions)
    
    }
    
    async findOneRole(conditions: Partial<RoleEntity>) {

        return await this.rolesRepository.findOne(conditions)
    
    }

}
