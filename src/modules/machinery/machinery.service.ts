import * as mongoose from 'mongoose'
import { forwardRef, Inject, Injectable } from '@nestjs/common'
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
import { BookingService } from '../booking/booking.service'
import { UserService } from '../user/user.service'
import { RoleService } from '../role/role.service'
import { EquipmentsByBooking, ExternalEquipmentsByBooking } from './results/equipmentsByBooking.result'
import { MachineryJobRegistry, MachineryJobRegistryDocument } from './machineryJobRegistry.schema'
import { MachineryJobRegistryInput } from './inputs/machineryJobRegistry.input'
import { MachineryFuelRegistry, MachineryFuelRegistryDocument } from './machineryFuelRegistry.schema'
import { MachineryFuelRegistryInput } from './inputs/machineryFuelRegistry.input'

@Injectable()
export class MachineryService {

    constructor(
        @InjectModel(Machinery.name)
        private machineryModel: Model<MachineryDocument>,
        @InjectModel(MachineryJobRegistry.name)
        private machineryJobRegistryModel: Model<MachineryJobRegistryDocument>,
        @InjectModel(MachineryFuelRegistry.name)
        private machineryFuelRegistryModel: Model<MachineryFuelRegistryDocument>,
        @InjectConnection()
        private readonly connection: mongoose.Connection,
        private readonly userService: UserService,
        private readonly roleService: RoleService,
        @Inject(forwardRef( () => BookingService) )
        private readonly bookingService: BookingService,
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
            code   : equipment.code.toUpperCase().trim(),
            patent : equipment.patent.toUpperCase().trim(),
            model  : equipment.model.toUpperCase().trim(),
            brand  : equipment.brand.toUpperCase().trim(),
            name   : equipment.name.toUpperCase().trim(),
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
                    code   : equipment.code.toUpperCase().trim(),
                    patent : equipment.patent.toUpperCase().trim(),
                    model  : equipment.model.toUpperCase().trim(),
                    brand  : equipment.brand.toUpperCase().trim(),
                    name   : equipment.name.toUpperCase().trim(),
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

    async getAllEquipmentsByBuilding(userId, date) {
            
        const user = await this.userService.findOneUser( { _id: new ObjectId(userId) } )
        const role = await this.roleService.findOneRole( { _id: user.role._id } )

        const bookings = await this.bookingService.getAllBookingsByUserAndDate(userId, date, role.name)

        let equipments = []

        if (role.name === 'operator') {

            const cache = {}

            for (const booking of bookings) {

                if (booking.machines) {

                    for (const machine of booking.machines) {

                        if (machine.operator.toString() === userId) {

                            const _id = machine.equipment.toString()

                            if (!cache[_id] )
                                cache[_id] = await this.findOneEquipment( { _id: new ObjectId(_id) } )


                            equipments.push( {
                                ...cache[_id],
                                workCondition: machine.workCondition,
                            } )
                        
                        }
                    
                    }
                
                }
            
            }

            return new EquipmentsByBooking(equipments)
        
        }
        else if (role.name === 'construction_manager') {

            equipments = bookings.reduce( (acc, booking) => {

                if (booking.machines) {
    
                    booking.machines.forEach(machine => {
    
                        acc.push( {
                            _id           : machine.equipment,
                            type          : machine.machineryType,
                            minHours      : machine.minHours,
                            workCondition : machine.workCondition,
                        } )
                    
                    } )
                
                }
    
                return acc
            
            }, [] )

            return new ExternalEquipmentsByBooking(equipments)
        
        }

    
        return equipments
    
    }

    async createMachineryJobRegistry(machineryJobRegistry: MachineryJobRegistryInput) {
        
        const session = await this.connection.startSession()
        session.startTransaction()
            
        const newJobRegistry = new this.machineryJobRegistryModel( {
            ...machineryJobRegistry,
        } )
    
        try {

            await newJobRegistry.save()
            await session.commitTransaction()

            return new Ok()
        
        }
        catch (error) {

            await session.abortTransaction()
            throw error
        
        }
        finally {

            session.endSession()
        
        }
    
    }

    async createMachineryFuelRegistry(machineryFuelRegistry: MachineryFuelRegistryInput) {
        
        const session = await this.connection.startSession()
        session.startTransaction()
                
        const newFuelRegistry = new this.machineryFuelRegistryModel( {
            ...machineryFuelRegistry,
        } )
        
        try {
    
            await newFuelRegistry.save()
            await session.commitTransaction()
    
            return new Ok()
            
        }
        catch (error) {
    
            await session.abortTransaction()
            throw error
            
        }
        finally {
    
            session.endSession()
            
        }
        
    }

}
