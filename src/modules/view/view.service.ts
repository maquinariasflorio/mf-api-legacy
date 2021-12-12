import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { MongoRepository } from 'typeorm'
import { ViewEntity } from './view.entity'

@Injectable()
export class ViewService {

    constructor(
        @InjectRepository(ViewEntity)
        private viewsRepository: MongoRepository<ViewEntity>,
    ) {}

    async findView(conditions: Partial<ViewEntity>) {

        return await this.viewsRepository.find(conditions)
    
    }
    
    async findOneView(conditions: Partial<ViewEntity>) {

        return await this.viewsRepository.findOne(conditions)
    
    }

    async find() {
            
        return await this.viewsRepository.find()
        
    }

}
