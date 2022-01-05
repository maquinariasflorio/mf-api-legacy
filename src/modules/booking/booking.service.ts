import * as mongoose from 'mongoose'
import { forwardRef, Inject, Injectable } from '@nestjs/common'
import { InjectModel, InjectConnection } from '@nestjs/mongoose'
import { ObjectId } from 'mongodb'
import { Model } from 'mongoose'
import { Ok } from 'src/commons/results/ok.result'
import { AllowedBookingType, Booking, BookingDocument } from './booking.schema'
import { BookingInput } from './input/booking.input'
import { DeleteBookingInput } from './input/deleteBooking.input'
import { UpdateBookingInput } from './input/updateBooking.input'
import { BookingNotFound } from './results/bookingNotFound.result'
import { RoleService } from '../role/role.service'
import { UserService } from '../user/user.service'
import { isValidObjectId } from 'src/helpers/objectIdValidator'
import { MachineryService } from '../machinery/machinery.service'

@Injectable()
export class BookingService {

    constructor(
        @InjectModel(Booking.name)
        private bookingModel: Model<BookingDocument>,
        @InjectConnection()
        private readonly connection: mongoose.Connection,
        private readonly userService: UserService,
        private readonly roleService: RoleService,
        @Inject(forwardRef( () => MachineryService) )
        private readonly machineryService: MachineryService,
    ) {}

    async findBooking(conditions: Record<string, unknown>) {

        return await this.bookingModel.find(conditions).lean()
    
    }
    
    async findOneBooking(conditions: Record<string, unknown>, projection?) {

        return await this.bookingModel.findOne(conditions, projection).lean()
    
    }

    async getAll() : Promise<Booking[]> {

        return await this.bookingModel.find().lean()

    }

    async createBooking(booking: BookingInput) {

        const session = await this.connection.startSession()
        session.startTransaction()
            
        const newBooking = new this.bookingModel( {
            ...this.mapBookingByType(booking).$set,
        } )
    
        try {

            await newBooking.save()
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

    async deleteBooking(booking: DeleteBookingInput) {

        const existBooking = await this.findOneBooking( { _id: new ObjectId(booking._id) } )

        if (!existBooking)
            return new BookingNotFound()

        await this.bookingModel.deleteOne( { _id: new ObjectId(booking._id) } )

        return new Ok()
    
    }

    async updateBooking(booking: UpdateBookingInput) {

        const existBooking = await this.findOneBooking( { _id: new ObjectId(booking._id) } )

        if (!existBooking)
            return new BookingNotFound()

        await this.bookingModel.updateOne( { _id: new ObjectId(booking._id) }, {
            $set: {
                ...this.mapBookingByType(booking).$set,
            },

            $unset: {
                ...this.mapBookingByType(booking).$unset,
            },
        } )

        return new Ok()
    
    }

    private mapBookingByType(booking: BookingInput | UpdateBookingInput) {

        const newBooking = {
            $set   : {},
            $unset : {},
        }

        if (booking instanceof UpdateBookingInput)
            newBooking.$set['_id'] = booking._id

        if (booking.type === AllowedBookingType.EXTERNAL) {

            newBooking.$set['constructionManager'] = new ObjectId(booking.constructionManager)
            newBooking.$set['company'] = booking.company.toUpperCase().trim()
        
        }
        else if (booking.type === AllowedBookingType.INTERNAL) {

            newBooking.$unset['constructionManager'] = ''
            newBooking.$unset['company'] = ''
        
        }

        newBooking.$set['type'] = booking.type
        newBooking.$set['client'] = new ObjectId(booking.client)
        newBooking.$set['building'] = booking.building.toUpperCase().trim()
        newBooking.$set['startDate'] = new Date(booking.startDate)
        newBooking.$set['endDate'] = new Date(booking.endDate)
        newBooking.$set['address'] = booking.address.toUpperCase().trim()
        newBooking.$set['machines'] = booking.machines.map(machinery => {

            return {
                ...machinery,
                equipment : booking.type === AllowedBookingType.INTERNAL ? new ObjectId(machinery.equipment) : machinery.equipment.toUpperCase().trim(),
                operator  : booking.type === AllowedBookingType.INTERNAL ? new ObjectId(machinery.operator) : machinery.operator.toUpperCase().trim(),
            }
        
        } )
        newBooking.$set['receivers'] = booking.receivers.map(receiver => {

            return {
                ...receiver,
                email: receiver.email.toLowerCase(),
            }
        
        } )
    
        return newBooking
    
    }

    async getAllBuildingsByClientAndDate(client: string, date: string, equipment: string) {

        return await this.findBooking( {
            client    : new ObjectId(client),
            startDate : { $lte: new Date(date) },
            endDate   : { $gte: new Date(date) },
            machines  : {
                $elemMatch: {
                    equipment: isValidObjectId(equipment) ? new ObjectId(equipment) : equipment,
                },
            },
        } )
    
    }

    async getAllBookingsByUserAndDate(user: string, date: string, role: string) {

        const condition = {
            startDate : { $lte: new Date(date) },
            endDate   : { $gte: new Date(date) },
            machines  : {
                $elemMatch: {
                    operator: new ObjectId(user),
                },
            },

            constructionManager: new ObjectId(user),
        }

        if (role === 'operator')
            delete condition.constructionManager
        else if (role === 'construction_manager')
            delete condition.machines
        

        return await this.findBooking(condition)
        
    }

    async getUserNextJob(userId: string, date: string) {

        const user = await this.userService.findOneUser( { _id: new ObjectId(userId) } )
        const role = await this.roleService.findOneRole( { _id: user.role._id } )

        const bookings = await this.getAllBookingsByUserAndDate(userId, date, role.name)

        if (role.name === 'operator') {

            return bookings.map(b => {
                
                return {
                    ...b,
                    machines: b.machines.filter(m => m.operator.toString() === userId),
                }
                
            } )
        
        }
        else if (role.name === 'construction_manager') {

            return bookings
        
        }
        
    
    }

    async getBookingsByDate(date: string) {

        const bookings = await this.findBooking( {
            startDate : { $lte: new Date(date) },
            endDate   : { $gte: new Date(date) },
        } )

        const equipmentsCache = {}
        const operatorsCache = {}

        for (const booking of bookings) {

            if (booking.machines) {

                if (booking.type === AllowedBookingType.INTERNAL) {

                    for (const machine of booking.machines) {

                        const equipment = equipmentsCache[machine.equipment.toString()]
                            ? equipmentsCache[machine.equipment.toString()]
                            : await this.machineryService.findOneEquipment( { _id: machine.equipment } )

                        equipmentsCache[machine.equipment.toString()] = equipment

                        const operator = operatorsCache[machine.operator.toString()]
                            ? operatorsCache[machine.operator.toString()]
                            : await this.userService.findOneUser( { _id: machine.operator } )

                        operatorsCache[machine.operator.toString()] = operator

                        machine.equipment = equipment
                        machine.operator = operator
                    
                    }
                
                }
            
            }
        
        }
    
        return bookings
        
    }

}
