import { Injectable } from '@nestjs/common'
import { ObjectId } from 'mongodb'
import { BookingService } from '../booking/booking.service'
import { ClientService } from '../client/client.service'
import { MachineryService } from '../machinery/machinery.service'
import { UserService } from '../user/user.service'
import { DailyReport } from './results/daily.result'

@Injectable()
export class ReportService {

    constructor(
        private readonly userService: UserService,
        private readonly clientService: ClientService,
        private readonly bookingService: BookingService,
        private readonly machineryService: MachineryService,
    ) {}

    async getDailyResume(date: string) {

        const dailyReport = new DailyReport()

        // buildings of the day

        const bookings = await this.bookingService.getBookingsByDate(date)

        function getMachineBooking(equipment: string, type: string) {

            for (const booking of bookings) {

                if (type === booking.type) {

                    for (const machine of booking.machines) {

                        if (type === 'INTERNAL' && machine.equipment._id.toString() === equipment)
                            return { booking, machine }
                        else if (type === 'EXTERNAL' && machine.equipment === equipment)
                            return { booking, machine }
                    
                    }
                
                }
            
            }

            return {
                booking : null,
                machine : null,
            }

        }

        // get all internal machines

        const internalMachineryJobRegistries = await this.machineryService.getAllMachineryJobRegistry( {
            "date"          : new Date(date),
            "equipment._id" : {
                $exists: true,
            },

            "machineryType": 'OTHER',
        } )
        const internalMachineryJobRegistriesMachinesIds = internalMachineryJobRegistries.map( (jobRegistry) => new ObjectId(jobRegistry.equipment._id) )

        const restOfMachines = await this.machineryService.findEquipment( {
            type : 'OTHER',
            _id  : {
                $nin: internalMachineryJobRegistriesMachinesIds,
            },
        } )
        
        const internalMachinesUnion = [

            ...internalMachineryJobRegistries.map( (jobRegistry) => {

                return {
                    equipment      : `${jobRegistry.equipment.code} | ${jobRegistry.equipment.name}`,
                    building       : jobRegistry.building,
                    operator       : `${jobRegistry.operator.rut} | ${jobRegistry.operator.name}`,
                    address        : jobRegistry.address,
                    startHourmeter : jobRegistry.startHourmeter,
                    endHourmeter   : jobRegistry.endHourmeter,
                    totalHours     : jobRegistry.totalHours,
                    observations   : jobRegistry.observations || '',
                }
            
            } ),

            ...restOfMachines.map( (equipment) => {

                const { booking, machine } = getMachineBooking(equipment._id.toString(), 'INTERNAL')

                return {
                    equipment      : `${equipment.code} | ${equipment.name}`,
                    building       : booking ? booking.building : '',
                    operator       : machine ? machine.operator : '',
                    address        : booking ? booking.address : '',
                    startHourmeter : 0,
                    endHourmeter   : 0,
                    totalHours     : 0,
                    observations   : '',
                }
            
            } ),

        ].sort( (a, b) => a.equipment.localeCompare(b.equipment) )


        const internalTruckJobRegistries = await this.machineryService.getAllMachineryJobRegistry( {
            "date"          : new Date(date),
            "equipment._id" : {
                $exists: true,
            },

            "machineryType": 'TRUCK',
        } )
        const internalTruckJobRegistriesMachinesIds = internalTruckJobRegistries.map( (jobRegistry) => new ObjectId(jobRegistry.equipment._id) )

        const restOfTruckMachines = await this.machineryService.findEquipment( {
            type : 'TRUCK',
            _id  : {
                $nin: internalTruckJobRegistriesMachinesIds,
            },
        } )

        const internalTrucksUnion = [

            ...internalTruckJobRegistries.map( (jobRegistry) => {

                return {
                    equipment      : `${jobRegistry.equipment.code} | ${jobRegistry.equipment.name}`,
                    operator       : `${jobRegistry.operator.rut} | ${jobRegistry.operator.name}`,
                    volume         : jobRegistry.equipment.volume,
                    building       : jobRegistry.building,
                    address        : jobRegistry.address,
                    load           : jobRegistry.load,
                    totalTravels   : jobRegistry.totalTravels,
                    workingDayType : jobRegistry.workingDayType ? (jobRegistry.workingDayType === 'FULL' ? 'COMPLETA' : 'MEDIA') : '',
                    observations   : jobRegistry.observations || '',
                }
            
            } ),

            ...restOfTruckMachines.map( (equipment) => {

                const { booking, machine } = getMachineBooking(equipment._id.toString(), 'INTERNAL')

                return {
                    equipment      : `${equipment.code} | ${equipment.name}`,
                    operator       : machine ? machine.operator : '',
                    volume         : equipment.volume,
                    building       : booking ? booking.building : '',
                    address        : booking ? booking.address : '',
                    load           : '',
                    totalTravels   : 0,
                    workingDayType : '',
                    observations   : '',
                }
            
            } ),

        ].sort( (a, b) => a.equipment.localeCompare(b.equipment) )

    
        // generate intern object
        dailyReport.intern = {
            machinery : internalMachinesUnion,
            trucks    : internalTrucksUnion,
        }


        // get all external machines

        const externalMachineryJobRegistries = await this.machineryService.getAllMachineryJobRegistry( {
            "date"          : new Date(date),
            "equipment._id" : {
                $exists: false,
            },

            "machineryType": 'OTHER',
        } )
        
        const externalMachinesUnion = [

            ...externalMachineryJobRegistries.map( (jobRegistry) => {

                return {
                    equipment      : jobRegistry.equipment.name,
                    building       : jobRegistry.building,
                    operator       : jobRegistry.operator.name,
                    address        : jobRegistry.address,
                    startHourmeter : jobRegistry.startHourmeter || 0,
                    endHourmeter   : jobRegistry.endHourmeter || 0,
                    totalHours     : jobRegistry.totalHours || 0,
                    observations   : jobRegistry.observations || '',
                }
            
            } ),

        ].sort( (a, b) => a.equipment.localeCompare(b.equipment) )


        const externalTruckJobRegistries = await this.machineryService.getAllMachineryJobRegistry( {
            "date"          : new Date(date),
            "equipment._id" : {
                $exists: false,
            },

            "machineryType": 'TRUCK',
        } )

        const externalTrucksUnion = [

            ...externalTruckJobRegistries.map( (jobRegistry) => {

                return {
                    equipment      : jobRegistry.equipment.name,
                    operator       : jobRegistry.operator.name,
                    volume         : 0,
                    building       : jobRegistry.building,
                    address        : jobRegistry.address,
                    load           : jobRegistry.load || '',
                    totalTravels   : jobRegistry.totalTravels || 0,
                    workingDayType : jobRegistry.workingDayType ? (jobRegistry.workingDayType === 'FULL' ? 'COMPLETA' : 'MEDIA') : '',
                    observations   : jobRegistry.observations || '',
                }
            
            } ),

        ].sort( (a, b) => a.equipment.localeCompare(b.equipment) )

    
        // generate intern object
        dailyReport.extern = {
            machinery : externalMachinesUnion,
            trucks    : externalTrucksUnion,
        }

        return dailyReport
    
    }

    async getDailyPayState(date: string) {

        const jobRegistries = await this.machineryService.getAllMachineryJobRegistry( {
            "date"          : new Date(date),
            "equipment._id" : { $exists: true },
        } )


    }

}
