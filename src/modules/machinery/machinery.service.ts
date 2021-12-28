import * as mongoose from 'mongoose'
import { Injectable } from '@nestjs/common'
import { InjectModel, InjectConnection } from '@nestjs/mongoose'
import { ObjectId } from 'mongodb'
import { Model } from 'mongoose'
import { Ok } from 'src/commons/results/ok.result'
import { DeleteEquipmentInput } from './inputs/deleteEquipment.input'
import { EquipmentInput } from './inputs/equipment.input'
import { UpdateEquipmentInput } from './inputs/updateEquipment.input'
import { AllowedMachineryType, Machinery, MachineryDocument } from './machinery.schema'
import { EquipmentNotFound } from './results/equipmentNotFound.result'
import { CodeAlreadyExists } from './results/codeAlreadyExists.result'
import { PatentAlreadyExists } from './results/patentAlreadyExists.result'

@Injectable()
export class MachineryService {

    constructor(
        @InjectModel(Machinery.name)
        private machineryModel: Model<MachineryDocument>,
        @InjectConnection()
        private readonly connection: mongoose.Connection,
    ) {}

    async findEquipment(conditions: Record<string, unknown>) {

        return await this.machineryModel.find(conditions).lean()
    
    }
    
    async findOneEquipment(conditions: Record<string, unknown>, projection?) {

        return await this.machineryModel.findOne(conditions, projection).lean()
    
    }

    async getAllEquipments() : Promise<Machinery[]> {

        return await this.machineryModel.find().lean()

    }

    async createEquipment(equipment: EquipmentInput) {

        const session = await this.connection.startSession()
        session.startTransaction()
            
        const newEquipment = new this.machineryModel( {
            ...equipment,
            code   : equipment.code.toUpperCase(),
            patent : equipment.patent.toUpperCase(),
            volume : equipment.type === AllowedMachineryType.TRUCK ? equipment.volume : undefined,
        } )
    
        try {

            await newEquipment.save()
            await session.commitTransaction()

            return new Ok( { message: 'Equipment created successfully' } )
        
        }
        catch (error) {

            await session.abortTransaction()

            if (error.code === 11000) {

                if ('code' in error.keyPattern)
                    return new CodeAlreadyExists()
                else if ('patent' in error.keyPattern)
                    return new PatentAlreadyExists()
            
            }
            else {

                throw error
            
            }
        
        }
        finally {

            session.endSession()
        
        }
    
    }

    async deleteEquipment(equipment: DeleteEquipmentInput) {

        const existEquipment = await this.findOneEquipment( { _id: new ObjectId(equipment._id) } )

        if (!existEquipment)
            return new EquipmentNotFound()

        await this.machineryModel.deleteOne( { _id: new ObjectId(equipment._id) } )

        return new Ok( { message: 'Equipment deleted successfully' } )
    
    }

    async updateEquipment(equipment: UpdateEquipmentInput) {

        const existEquipment = await this.findOneEquipment( { _id: new ObjectId(equipment._id) } )

        if (!existEquipment)
            return new EquipmentNotFound()
 
        try {

            await this.machineryModel.updateOne( { _id: new ObjectId(equipment._id) }, {
                $set: {
                    ...equipment,
                    code   : equipment.code.toUpperCase(),
                    patent : equipment.patent.toUpperCase(),
                    volume : equipment.type === AllowedMachineryType.TRUCK ? equipment.volume : undefined,
                },
            } )
            
        }
        catch (error) {

            if (error.code === 11000) {

                if ('code' in error.keyPattern)
                    return new CodeAlreadyExists()
                else if ('patent' in error.keyPattern)
                    return new PatentAlreadyExists()
            
            }
            else {

                throw error
            
            }
        
        }

        return new Ok( { message: 'Equipment updated successfully' } )
    
    }

}
