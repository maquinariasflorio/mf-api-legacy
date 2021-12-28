import * as mongoose from 'mongoose'
import { Injectable } from '@nestjs/common'
import { InjectModel, InjectConnection } from '@nestjs/mongoose'
import { ObjectId } from 'mongodb'
import { Model } from 'mongoose'
import { Ok } from 'src/commons/results/ok.result'
import { AllowedBookingType, Booking, BookingDocument } from './booking.schema'
import { BookingInput } from './input/booking.input'
import { DeleteBookingInput } from './input/deleteBooking.input'
import { UpdateBookingInput } from './input/updateBooking.input'
import { BookingNotFound } from './results/bookingNotFound.result'
import { AllowedMachineryType } from '../machinery/machinery.schema'

@Injectable()
export class BookingService {

    constructor(
        @InjectModel(Booking.name)
        private bookingModel: Model<BookingDocument>,
        @InjectConnection()
        private readonly connection: mongoose.Connection,
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
            ...this.mapBookingByType(booking),
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
                ...this.mapBookingByType(booking),
            },
        } )

        return new Ok()
    
    }

    private mapBookingByType(booking: BookingInput | UpdateBookingInput) {

        const newBooking = {}

        if (booking instanceof UpdateBookingInput)
            newBooking['_id'] = booking._id

        if (booking.type === AllowedBookingType.EXTERNAL) {

            newBooking['constructionManager'] = booking.constructionManager
            newBooking['equipment'] = booking.equipment
            newBooking['operator'] = booking.operator
            newBooking['company'] = booking.company
        
        }
        else if (booking.type === AllowedBookingType.INTERNAL) {

            newBooking['equipment'] = new ObjectId(booking.equipment)
            newBooking['operator'] = new ObjectId(booking.operator)
        
        }

        if (booking.machineryType === AllowedMachineryType.TRUCK) {

            newBooking['workCondition'] = booking.workCondition

        }
        else if (booking.machineryType === AllowedMachineryType.OTHER) {

            newBooking['minHours'] = booking.minHours
            newBooking['amountPerHour'] = booking.amountPerHour

        }

        newBooking['type'] = booking.type
        newBooking['client'] = new ObjectId(booking.client)
        newBooking['machineryType'] = booking.machineryType
        newBooking['building'] = booking.building
        newBooking['startDate'] = new Date(booking.startDate)
        newBooking['endDate'] = new Date(booking.endDate)
        newBooking['address'] = booking.address
        newBooking['receivers'] = booking.receivers.map(receiver => {

            return {
                ...receiver,
                email: receiver.email.toLowerCase(),
            }
        
        } )
    
        return newBooking
    
    }

}
