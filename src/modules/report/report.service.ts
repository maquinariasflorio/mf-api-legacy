import { Injectable } from '@nestjs/common'
import { ObjectId } from 'mongodb'
import { AllowedWorkCondition } from '../booking/booking.schema'
import { BookingService } from '../booking/booking.service'
import { ClientService } from '../client/client.service'
import { AllowedMachineryType } from '../machinery/machinery.schema'
import { MachineryService } from '../machinery/machinery.service'
import { MachineryJobRegistry } from '../machinery/machineryJobRegistry.schema'
import { UserService } from '../user/user.service'
import { DailyReport } from './results/daily.result'
import { DailyPayStateReport } from './results/dailyPayStateReport.result'

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

        const clientIds = jobRegistries.map( (jobRegistry) => jobRegistry.client._id)
        
        const bookings = await this.bookingService.findBooking( {
            client    : { $in: clientIds },
            startDate : { $lte: new Date(date) },
            endDate   : { $gte: new Date(date) },
        } )

        const groupedJobRegistries = jobRegistries.reduce( (acc, item) => {

            const equipment = typeof item.equipment === 'string' ? item.equipment : item.equipment._id.toString()

            const key = item.machineryType === AllowedMachineryType.OTHER ? `${equipment}-${item.client._id}-${item.building}` : item._id.toString()

            if (!acc[key] )
                acc[key] = []

            acc[key].push(item)

            return acc

        }, {} )

        const resume = []

        for (const registries of Object.values(groupedJobRegistries) ) {

            const item = registries[0]
            const equipment = typeof item.equipment._id ? item.equipment._id.toString() : item.equipment.name
            const hours = (registries as MachineryJobRegistry[] ).reduce( (acc, item) => acc + (item.totalHours || 0), 0)

            const booking = bookings.find( (booking) => {

                return booking.machines.find( (machine) => machine.equipment.toString() === equipment)
            
            } )

            const bookingMachine = booking ? booking.machines.find( (machine) => {

                const equipment = typeof item.equipment._id ? item.equipment._id.toString() : item.equipment.name

                return machine.equipment.toString() === equipment

            } ) : null
            
            let amountPerUse = 0
            let amounType = ''
            const minHours = bookingMachine ? (bookingMachine.minHours || 0) : 0
            let toFacture = Math.max(hours, minHours)

            if (item.machineryType === AllowedMachineryType.OTHER) {

                amountPerUse = bookingMachine ? (bookingMachine.amountPerHour || 0) : 0
                amounType = 'por Hora'
            
            }
            else if (item.machineryType === AllowedMachineryType.TRUCK) {

                let workCondition = item.bookingWorkCondition

                if (item.bookingWorkCondition === 'BOTH')
                    workCondition = item.workCondition

                if (workCondition === AllowedWorkCondition.DAY) {

                    amountPerUse = bookingMachine ? (bookingMachine.amountPerDay || 0) : 0
                    amounType = 'por Jornada'

                    if (item.workingDayType === 'FULL')
                        toFacture = 1
                    else if (item.workingDayType === 'HALF')
                        toFacture = 0.5
                
                }
                else if (workCondition === AllowedWorkCondition.TRAVEL) {

                    amountPerUse = bookingMachine ? (bookingMachine.amountPerTravel || 0) : 0
                    amounType = 'por Viaje'
                    toFacture = item.totalTravels || 0
                
                }
            
            }

            resume.push( ( {
                client      : item.client,
                building    : item.building,
                operator    : item.operator,
                equipment   : item.equipment,
                amountPerUse,
                amounType,
                hours,
                minHours,
                toFacture,
                totalAmount : toFacture * amountPerUse,
            } as DailyPayStateReport) )
        
        }

        return resume
    
    }

}
