import * as mongoose from 'mongoose'
import { forwardRef, Inject, Injectable } from '@nestjs/common'
import { InjectModel, InjectConnection } from '@nestjs/mongoose'
import { ObjectId } from 'mongodb'
import { Model } from 'mongoose'
import { Ok } from 'src/commons/results/ok.result'
import { DeleteEquipmentInput } from './inputs/deleteEquipment.input'
import { EquipmentInput } from './inputs/equipment.input'
import { UpdateEquipmentInput } from './inputs/updateEquipment.input'
import { AllowedMachineryType, Machinery, MachineryDocument, MaintenanceMachineryClass } from './machinery.schema'
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
import { PubSubEngine } from 'graphql-subscriptions'
import { MachineryMaintenance, MachineryMaintenanceDocument, MaintenanceStatus } from './machineryMaintenance.schema'
import { isValidObjectId } from 'src/helpers/objectIdValidator'
import { UpdateMachineryJobRegistryInput } from './inputs/updateMachineryJobRegistry.input'
import { MachineryJobRegistryNotFound } from './results/machineryJobRegistryNotFound.result'
import { DeleteMachineryJobRegistryInput } from './inputs/deleteMachineryJobRegistry.input'
import { ClientService } from '../client/client.service'
import { CounterService } from '../counter/counter.service'
import { AllowedWorkCondition } from '../booking/booking.schema'

@Injectable()
export class MachineryService {

    constructor(
        @Inject('PUB_SUB')
        private pubSub: PubSubEngine,
        @InjectModel(Machinery.name)
        private machineryModel: Model<MachineryDocument>,
        @InjectModel(MachineryJobRegistry.name)
        private machineryJobRegistryModel: Model<MachineryJobRegistryDocument>,
        @InjectModel(MachineryFuelRegistry.name)
        private machineryFuelRegistryModel: Model<MachineryFuelRegistryDocument>,
        @InjectModel(MachineryMaintenance.name)
        private machineryMaintenanceModel: Model<MachineryMaintenanceDocument>,
        @InjectConnection()
        private readonly connection: mongoose.Connection,
        private readonly userService: UserService,
        private readonly roleService: RoleService,
        private readonly clientService: ClientService,
        private readonly counterService: CounterService,
        @Inject(forwardRef( () => BookingService) )
        private readonly bookingService: BookingService,
    ) {}

    async findEquipment(conditions?: Record<string, unknown>) {

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

        const equipments = []

        // If role is operator, we knows that the booking is internal

        if (role.name === 'operator') {

            const equipmentCache = {}
            const clientCache = {}

            for (const booking of bookings) {

                if (booking.machines) {

                    const _idClient = booking.client._id.toString()

                    if (!clientCache[_idClient] )
                        clientCache[_idClient] = await this.clientService.findOneClient( { _id: new ObjectId(_idClient) } )

                    for (const machine of booking.machines) {

                        if (machine.operator.toString() === userId) {

                            const _id = machine.equipment.toString()

                            if (!equipmentCache[_id] )
                                equipmentCache[_id] = await this.findOneEquipment( { _id: new ObjectId(_id) } )

                            equipments.push( {
                                ...equipmentCache[_id],
                                workCondition : machine.workCondition,
                                client        : {
                                    ...clientCache[_idClient],
                                },

                                building : booking.building,
                                operator : user,
                                address  : booking.address,
                            } )
                        
                        }
                    
                    }
                
                }
            
            }

            return new EquipmentsByBooking(equipments)
        
        }
        else if (role.name === 'construction_manager') {

            const clientCache = {}

            for (const booking of bookings) {

                if (booking.machines) {

                    const _idClient = booking.client._id.toString()

                    if (!clientCache[_idClient] )
                        clientCache[_idClient] = await this.clientService.findOneClient( { _id: new ObjectId(_idClient) } )

                    for (const machine of booking.machines) {

                        equipments.push( {
                            _id           : machine.equipment,
                            type          : machine.machineryType,
                            minHours      : machine.minHours,
                            workCondition : machine.workCondition,
                            client        : {
                                ...clientCache[_idClient],
                            },

                            building : booking.building,
                            operator : machine.operator,
                            address  : booking.address,
                        } )
                    
                    }
                
                }
            
            }

            return new ExternalEquipmentsByBooking(equipments)
        
        }

    
        return equipments
    
    }

    async createMachineryJobRegistry(machineryJobRegistry: MachineryJobRegistryInput, user: string) {

        const session = await this.connection.startSession()
        session.startTransaction()

        let equipment: any = { name: machineryJobRegistry.equipment }
        if (isValidObjectId(machineryJobRegistry.equipment) ) {

            const equipmentModel = await this.findOneEquipment( { _id: new ObjectId(machineryJobRegistry.equipment) } )
            equipment = equipmentModel
        
        }

        const client = await this.clientService.findOneClient( { _id: new ObjectId(machineryJobRegistry.client) } )
        const operator = isValidObjectId(machineryJobRegistry.operator) ? await this.userService.findOneUser( { _id: new ObjectId(machineryJobRegistry.operator) } ) : { name: machineryJobRegistry.operator }
        
        const executor = await this.userService.findOneUser( { _id: new ObjectId(user) } )

        const newMachineryJobRegistry = this.parseMachineryJobRegistry(machineryJobRegistry)

        const newJobRegistry = new this.machineryJobRegistryModel( {
            ...newMachineryJobRegistry,
            executor,
            equipment,
            client,
            operator,
        } )
    
        try {

            const newDocument = await newJobRegistry.save()

            const { lastFolio } = await this.counterService.findOneAndUpdate('jobRegistryFolio', {
                $inc: {
                    lastFolio: 1,
                },
            } )

            await this.machineryJobRegistryModel.updateOne( { _id: newDocument._id }, {
                $set: {
                    folio: lastFolio,
                },
            } )

            if (isValidObjectId(machineryJobRegistry.equipment) ) {

                const equipment = await this.findOneEquipment( { _id: new ObjectId(machineryJobRegistry.equipment) } )

                await this.calculateMaintenance(equipment, machineryJobRegistry.endHourmeter)
            
            }

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

    private parseMachineryJobRegistry(machineryJobRegistry: MachineryJobRegistryInput) {

        let newInput = {
            ...machineryJobRegistry,
        }

        if (machineryJobRegistry.machineryType === AllowedMachineryType.TRUCK && machineryJobRegistry.bookingWorkCondition === AllowedWorkCondition.BOTH) {

            if (machineryJobRegistry.workCondition === AllowedWorkCondition.TRAVEL) {

                newInput = {
                    ...newInput,
                    workingDayType: null,
                }

            }
            else if (machineryJobRegistry.workCondition === AllowedWorkCondition.DAY) {

                newInput = {
                    ...newInput,
                    totalTravels: 0,
                }
            
            }

        }

        return newInput
    
    }

    async updateMachineryJobRegistry(machineryJobRegistry: UpdateMachineryJobRegistryInput) {

        const existJobRegistry = await this.machineryJobRegistryModel.findOne( { _id: new ObjectId(machineryJobRegistry._id) } )

        if (!existJobRegistry)
            return new MachineryJobRegistryNotFound()

        delete machineryJobRegistry.executor
        delete machineryJobRegistry.equipment
        delete machineryJobRegistry.operator

        const client = await this.clientService.findOneClient( { _id: new ObjectId(machineryJobRegistry.client) } )
            
        const newMachineryJobRegistry = this.parseMachineryJobRegistry(machineryJobRegistry)

        await this.machineryJobRegistryModel.updateOne( { _id: new ObjectId(machineryJobRegistry._id) }, {
            $set: {
                ...newMachineryJobRegistry,
                client,
            },
        } )

        return new Ok()
    
    }

    async deleteMachineryJobRegistry(machineryJobRegistry: DeleteMachineryJobRegistryInput) {
            
        const existJobRegistry = await this.machineryJobRegistryModel.findOne( { _id: new ObjectId(machineryJobRegistry._id) } )
    
        if (!existJobRegistry)
            return new MachineryJobRegistryNotFound()
    
        await this.machineryJobRegistryModel.deleteOne( { _id: new ObjectId(machineryJobRegistry._id) } )
    
        return new Ok()
        
    }

    async createMachineryFuelRegistry(machineryFuelRegistry: MachineryFuelRegistryInput) {
        
        const session = await this.connection.startSession()
        session.startTransaction()

        let previousRegistry = null
        
        if (isValidObjectId(machineryFuelRegistry.equipment) ) {

            previousRegistry = await this.machineryFuelRegistryModel.find( {
                equipment : machineryFuelRegistry.equipment,
                date      : {
                    $lt: new Date(machineryFuelRegistry.date),
                },
            } ).sort( { date: -1 } ).limit(1).lean()
        
        }
                
        const newFuelRegistry = new this.machineryFuelRegistryModel( {
            ...machineryFuelRegistry,
            previousRegistry: previousRegistry && previousRegistry[0] ? previousRegistry[0]._id.toString() : null,
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

    async getAllFuelRegistries(startDate:string, endDate: string) {
            
        const registries = await this.machineryFuelRegistryModel.find( {
            date: {
                $gte : new Date(startDate),
                $lte : new Date(endDate),
            },
        } )

        const equipments = await this.findEquipment()
        const operators = await this.userService.findUser()

        return registries.map( (registry) => {
                
            const equipment = equipments.find( (equipment) => equipment._id.toString() === registry.equipment)
            const operator = operators.find( (operator) => operator._id.toString() === registry.operator)

            return {
                ...registry.toJSON(),
                equipment : equipment ? equipment : { name: registry.equipment ? registry.equipment : '' },
                operator  : operator ? operator : { name: registry.operator ? registry.operator : '' },
            }
    
        } )
        
    }

    async getAllPreviousFuelRegistries(equipmentsId: string[] ) {
            
        const registries = await this.machineryFuelRegistryModel.find( {
            _id: {
                $in: equipmentsId,
            },
        } ).lean()

        const equipments = await this.findEquipment()
        const operators = await this.userService.findUser()

        return registries.map( (registry) => {
                
            const equipment = equipments.find( (equipment) => equipment._id.toString() === registry.equipment)
            const operator = operators.find( (operator) => operator._id.toString() === registry.operator)

            return {
                ...registry,
                equipment : equipment ? equipment : { name: registry.equipment ? registry.equipment : '' },
                operator  : operator ? operator : { name: registry.operator ? registry.operator : '' },
            }
    
        } )
        
    }

    private readonly maintenanceMetadata = {
        CLASS_A : { every: 250, steps: [ 500, 1000, 2000 ] },
        CLASS_B : { every: 500, steps: [ 1000, 3000 ] },
    }

    async calculateMaintenance(equipment: Machinery, newHourmeter: number) {

        const maintenanceType = this.maintenanceMetadata[equipment.maintenanceClass]

        // calculate the maintenance number to set it as id
        const maintenanceNumber = Math.floor(newHourmeter/maintenanceType.every)

        const biggestStep = Math.max.apply(null, maintenanceType.steps)
        const partition = Math.floor(newHourmeter/biggestStep)
        let kmsOfPartition = newHourmeter - (partition * biggestStep)
        kmsOfPartition = kmsOfPartition > 0 ? kmsOfPartition : newHourmeter

        const section = Math.floor(kmsOfPartition/maintenanceType.every)
        const deltaKms = kmsOfPartition - (section * maintenanceType.every)

        const alertMargin = 10

        if (deltaKms >= (maintenanceType.every - alertMargin) ) {

            const nextMaintenance = section * maintenanceType.every + maintenanceType.every
            const maintenanceStep = maintenanceType.steps.includes(nextMaintenance) ? nextMaintenance : maintenanceType.every

            const maintenance = new this.machineryMaintenanceModel( {
                uid              : maintenanceNumber + 1,
                equipment        : equipment._id.toString(),
                maintenanceClass : equipment.maintenanceClass,
                step             : maintenanceStep,
                kmsOfMachinery   : newHourmeter,
                status           : MaintenanceStatus.PENDING,
            } )

            try {

                const newMaintenance = await maintenance.save()
                this.pubSub.publish('maintenanceAdded', { maintenanceAdded: {
                    ...newMaintenance.toObject(),
                    equipment,
                } } )

                return newMaintenance
            
            }
            catch (error) {

                return null
            
            }
        
        }
    
        return null
    
    }

    async getAllLastMaintenance() {
            
        const allClassAMaintenances = await this.machineryMaintenanceModel.find( { maintenanceClass: MaintenanceMachineryClass.CLASS_A } ).sort( { uid: -1 } ).limit(4).lean()
        const allClassBMaintenances = await this.machineryMaintenanceModel.find( { maintenanceClass: MaintenanceMachineryClass.CLASS_B } ).sort( { uid: -1 } ).limit(4).lean()
        
        const equipments = await this.getAllEquipments()

        const groupedAMaintenances = this.addEquipmentToMaintenances(allClassAMaintenances, equipments)
        const groupedBMaintenances = this.addEquipmentToMaintenances(allClassBMaintenances, equipments)
    
        return [
            ...groupedAMaintenances,
            ...groupedBMaintenances,
        ]
        
    }

    private addEquipmentToMaintenances(maintenances: MachineryMaintenance[], equipments: Machinery[] ) {
            
        return maintenances.reduce( (acc, maintenance) => {
        
            acc.push( {
                ...maintenance,
                equipment: equipments.find(equipment => equipment._id.toString() === maintenance.equipment.toString() ),
            } )
        
            return acc
            
        }, [] )
        
    }

    async getMaintenancePage(equipment: string, lastUid: number) {
        
        const maintenances = await this.machineryMaintenanceModel.find( { equipment: new ObjectId(equipment), uid: { $lt: lastUid } } ).sort( { uid: -1 } ).limit(3).lean()
        const equipments = await this.getAllEquipments()

        return maintenances.reduce( (acc, maintenance) => {
        
            acc.push( {
                ...maintenance,
                equipment: equipments.find(equipment => equipment._id.toString() === maintenance.equipment.toString() ),
            } )
        
            return acc
            
        }, [] )
    
    }

    async changeMaintenanceStatus(id) {
            
        const maintenance = await this.machineryMaintenanceModel.findOne( { _id: new ObjectId(id) } )
        maintenance.status = maintenance.status === MaintenanceStatus.PENDING ? MaintenanceStatus.DONE : MaintenanceStatus.PENDING
        const updatedMaintenance = await maintenance.save()

        this.pubSub.publish('maintenanceStatusUpdated', { maintenanceStatusUpdated: { ...updatedMaintenance.toObject() } } )

        return updatedMaintenance
        
    }

    async getAllMachineryJobRegistry(conditions?: Record<string, unknown>) {
            
        const jobRegistries = await this.machineryJobRegistryModel.find(conditions).lean()
    
        return jobRegistries.reduce( (acc, jobRegistry) => {
            
            acc.push( {
                ...jobRegistry,
            } )
            
            return acc
                
        }, [] )
        
    }

    async getAllMachineryJobRegistryByUserAndDate(userId: string, startDate: string, endDate: string) {

        const conditions = {
            "executor._id": new ObjectId(userId),

            "date": {
                $gte : new Date(startDate),
                $lte : new Date(endDate),
            },
        }

        return await this.getAllMachineryJobRegistry(conditions)
    
    }

    async getAllMachineryJobRegistryByDate(date: string) {

        const conditions = {
            date: new Date(date),
        }

        return await this.getAllMachineryJobRegistry(conditions)
    
    }

}
