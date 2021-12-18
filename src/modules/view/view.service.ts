import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { View, ViewDocument } from './view.schema'

@Injectable()
export class ViewService {

    constructor(
        @InjectModel(View.name)
        private viewModel: Model<ViewDocument>,
    ) {}

    async findView(conditions?: Record<string, unknown>) {

        return await this.viewModel.find(conditions).lean()
    
    }
    
    async findOneView(conditions: Record<string, unknown>) {

        return await this.viewModel.findOne(conditions).lean()
    
    }

}
