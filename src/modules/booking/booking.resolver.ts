import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { AllowedMachineryType } from '../machinery/machinery.schema'
import { Booking } from './booking.schema'
import { BookingService } from './booking.service'
import { BookingInput } from './input/booking.input'
import { DeleteBookingInput } from './input/deleteBooking.input'
import { UpdateBookingInput } from './input/updateBooking.input'
import { CreateBookingResultUnion } from './outputs/createBooking.output'
import { DeleteBookingResultUnion } from './outputs/deleteBooking.output'
import { UpdateBookingResultUnion } from './outputs/updateBooking.output'

@Resolver()
export class BookingResolver {

    constructor(private readonly bookingService: BookingService) {}

    @Query( () => [ Booking ] )
    async getAllBookings() {

        return await this.bookingService.getAll()
    
    }

    @Mutation( () => CreateBookingResultUnion)
    async createBooking(@Args('form') form: BookingInput) {

        return await this.bookingService.createBooking(form)
    
    }

    @Mutation( () => UpdateBookingResultUnion)
    async updateBooking(@Args('form') form: UpdateBookingInput) {

        return await this.bookingService.updateBooking(form)
    
    }

    @Mutation( () => DeleteBookingResultUnion)
    async deleteBooking(@Args('form') form: DeleteBookingInput) {

        return await this.bookingService.deleteBooking(form)
    
    }

    @Query( () => [ Booking ] )
    async getBuildingsByClientAndDate(@Args('client') client: string, @Args('date') date: string, @Args('equipment') equipment: string) {

        return await this.bookingService.getAllBuildingsByClientAndDate(client, date, equipment)
    
    }

    @Query( () => [ Booking ] )
    async getUserNextJob(@Args('user') user: string, @Args('date') date: string) {

        return await this.bookingService.getUserNextJob(user, date)
    
    }

}
