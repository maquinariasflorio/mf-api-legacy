import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Counter, CounterDocument } from './counter.schema'

@Injectable()
export class CounterService {

    constructor(
        @InjectModel(Counter.name)
        private counterModel: Model<CounterDocument>,
    ) {}

    async findOneAndUpdate(name: string, data: any): Promise<any> {
            
        return await this.counterModel.findOneAndUpdate( { name }, data, {
            lean           : true,
            returnDocument : 'after',
        } )
    
    }

}
