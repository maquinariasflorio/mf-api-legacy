import { Injectable } from '@nestjs/common'
import { ObjectId } from 'mongodb'
import { isValidObjectId } from 'src/helpers/objectIdValidator'
import { AllowedWorkCondition } from '../booking/booking.schema'
import { BookingService } from '../booking/booking.service'
import { ClientService } from '../client/client.service'
import { AllowedMachineryType } from '../machinery/machinery.schema'
import { MachineryService } from '../machinery/machinery.service'
import { MachineryJobRegistry } from '../machinery/machineryJobRegistry.schema'
import { UserService } from '../user/user.service'
import { PayStatesFilter } from './inputs/payStatesFilter.input'
import { DailyReport } from './results/daily.result'
import { DailyPayStateReport } from './results/dailyPayStateReport.result'
import { GeneralPayStateMachinery, GeneralPayStateReport, GeneralPayStateTruck } from './results/generalPayStateReport.result'

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
                    equipment      : jobRegistry.equipment.code,
                    building       : jobRegistry.building,
                    operator       : jobRegistry.operator.name,
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
                    equipment      : equipment.code,
                    building       : booking ? booking.building : '',
                    operator       : machine && machine.operator ? machine.operator.name : '',
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
                    equipment      : jobRegistry.equipment.code,
                    operator       : jobRegistry.operator.name,
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
                    equipment      : equipment.code,
                    operator       : machine && machine.operator ? machine.operator.name : '',
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

            const equipment = item.equipment._id ? item.equipment._id.toString() : item.equipment.name

            const key = item.machineryType === AllowedMachineryType.OTHER ? `${equipment}-${item.client._id}-${item.building}` : item._id.toString()

            if (!acc[key] )
                acc[key] = []

            acc[key].push(item)

            return acc

        }, {} )

        const resume = []

        for (const registries of Object.values(groupedJobRegistries) ) {

            const item = registries[0]
            const equipment = item.equipment._id ? item.equipment._id.toString() : item.equipment.name
            const hours = (registries as MachineryJobRegistry[] ).reduce( (acc, item) => acc + (item.totalHours || 0), 0)

            const booking = bookings.find( (booking) => {

                return booking.machines.find( (machine) => machine.equipment.toString() === equipment)
            
            } )

            const bookingMachine = booking ? booking.machines.find( (machine) => {

                const equipment = item.equipment._id ? item.equipment._id.toString() : item.equipment.name

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

    async getEquipmentPayState(filters: PayStatesFilter) {

        const conditions = {
            "date": {
                $gte : new Date(filters.startDate),
                $lte : new Date(filters.endDate),
            },

            "client._id": new ObjectId(filters.client),
        }

        if (filters.building)
            conditions['building'] = filters.building

        if (isValidObjectId(filters.equipment) )
            conditions['equipment._id'] = new ObjectId(filters.equipment)
        else if (filters.equipment)
            conditions['equipment.name'] = filters.equipment
        
        const jobRegistries = await this.machineryService.getAllMachineryJobRegistry(conditions)

        const groupedJobRegistries = {
            OTHER : {},
            TRUCK : {},
        }
        
        jobRegistries.forEach( (item) => {

            const equipment = !item.equipment._id ? item.equipment : item.equipment._id.toString()
            const date = item.date.toISOString().split('T')[0]
            const truckWorkCondition = item.bookingWorkCondition === AllowedWorkCondition.BOTH ? item.workCondition : item.bookingWorkCondition

            const key = item.machineryType === AllowedMachineryType.OTHER
                ? `${equipment}-${item.client._id}-${item.building}-${date}`
                : `${equipment}-${item.client._id}-${item.building}-${date}-${truckWorkCondition}-${item.load}`

            if (!groupedJobRegistries[item.machineryType][key] )
                groupedJobRegistries[item.machineryType][key] = []

            groupedJobRegistries[item.machineryType][key].push(item)

        } )


        const result = ( {
            intern: {
                OTHER : [],
                TRUCK : [],
            },

            extern: {
                OTHER : [],
                TRUCK : [],
            },
        } as GeneralPayStateReport)

        // adding OTHER registries

        for (const jobs of Object.values(groupedJobRegistries.OTHER) ) {

            const job = jobs[0]
            const isInternal = job.equipment._id ? true : false

            // geting booking for jobRegistry

            const { bookingMachine } = await this.getBookingForJobRegistry( {
                client: filters.client,
                job,
                isInternal,
            } )

            // calculating use

            const amountPerUse = bookingMachine ? (bookingMachine.amountPerHour || 0) : 0
            const minHours = bookingMachine ? (bookingMachine.minHours || 0) : 0
            const hours = (jobs as MachineryJobRegistry[] ).reduce( (acc, item) => acc + (item.totalHours || 0), 0)
            const toFacture = Math.max(hours, minHours)
            const folio = (jobs as MachineryJobRegistry[] ).slice(1, (jobs as MachineryJobRegistry[] ).length).reduce( (acc, item) => item.folio ? `${acc}, ${item.folio}` : acc, jobs[0].folio || '')
        
            const record = ( {
                client      : job.client,
                date        : job.date,
                building    : job.building,
                operator    : job.operator,
                equipment   : job.equipment,
                amountPerUse,
                hours,
                minHours,
                toFacture,
                totalAmount : toFacture * amountPerUse,
                folio,
            } as GeneralPayStateMachinery)
        
            result[isInternal ? 'intern' : 'extern'].OTHER.push(record)
        
        }


        // adding TRUCK registries

        for (const jobs of Object.values(groupedJobRegistries.TRUCK) ) {

            const job = jobs[0]
            const isInternal = job.equipment._id ? true : false

            // geting booking for jobRegistry

            const { bookingMachine } = await this.getBookingForJobRegistry( {
                client: filters.client,
                job,
                isInternal,
            } )

            const volume = isInternal ? (job.equipment.volume || 0) : (bookingMachine.volume || 0)

            // calculating use

            const workCondition = job.bookingWorkCondition === AllowedWorkCondition.BOTH ? job.workCondition : job.bookingWorkCondition

            if (workCondition === AllowedWorkCondition.DAY) {

                for (const item of jobs as MachineryJobRegistry[] ) {

                    const amountPerDay = bookingMachine.amountPerDay || 0

                    const record = ( {
                        client         : item.client,
                        date           : item.date,
                        building       : item.building,
                        operator       : item.operator,
                        equipment      : item.equipment,
                        amountPerUse   : amountPerDay,
                        load           : item.load,
                        totalTravels   : 0,
                        volume         : volume,
                        workingDayType : item.workingDayType === 'FULL' ? 'COMPLETA' : (item.workingDayType === 'HALF' ? 'MEDIA' : ''),
                        totalAmount    : item.workingDayType === 'FULL' ? amountPerDay : (item.workingDayType === 'HALF' ? (amountPerDay / 2) : 0),
                        workCondition,
                        folio          : item.folio.toString(),
                    } as GeneralPayStateTruck)

                    result[isInternal ? 'intern' : 'extern'].TRUCK.push(record)
                
                }
            
            }
            else if (workCondition === AllowedWorkCondition.TRAVEL) {

                const amountPerTravel = bookingMachine ? bookingMachine.amountPerTravel : 0
                const travels = (jobs as MachineryJobRegistry[] ).reduce( (acc, item) => acc + (item.totalTravels || 0), 0)
                const folio = (jobs as MachineryJobRegistry[] ).slice(1, (jobs as MachineryJobRegistry[] ).length).reduce( (acc, item) => item.folio ? `${acc}, ${item.folio}` : acc, jobs[0].folio || '')

                const record = ( {
                    client         : job.client,
                    date           : job.date,
                    building       : job.building,
                    operator       : job.operator,
                    equipment      : job.equipment,
                    amountPerUse   : amountPerTravel,
                    load           : job.load,
                    totalTravels   : travels,
                    volume         : volume,
                    origin         : job.origin,
                    workingDayType : '',
                    totalAmount    : travels * amountPerTravel * volume,
                    workCondition,
                    folio,
                } as GeneralPayStateTruck)

                result[isInternal ? 'intern' : 'extern'].TRUCK.push(record)
            
            }
        
        }
    
        return result
    
    }

    private async getBookingForJobRegistry( {
        client,
        job,
        isInternal,
    } ) {

        const bookingConditions = {
            client    : new ObjectId(client),
            startDate : { $lte: job.date },
            endDate   : { $gte: job.date },
            building  : job.building,
        }

        if (isInternal) {

            bookingConditions['machines'] = {
                $elemMatch: {
                    equipment: job.equipment._id,
                },
            }

        }
        else {

            bookingConditions['machines'] = {
                $elemMatch: {
                    equipment: job.equipment.name,
                },
            }

        }

        const booking = await this.bookingService.findOneBooking(bookingConditions)
        const bookingMachine = booking ? booking.machines.find( (machine) => {

            const equipment = isInternal ? job.equipment._id.toString() : job.equipment.name

            return machine.equipment.toString() === equipment

        } ) : null

        return {
            booking,
            bookingMachine,
        }
    
    }

}
