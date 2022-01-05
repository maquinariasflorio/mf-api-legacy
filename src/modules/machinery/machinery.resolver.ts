import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { DeleteEquipmentInput } from './inputs/deleteEquipment.input'
import { EquipmentInput } from './inputs/equipment.input'
import { MachineryFuelRegistryInput } from './inputs/machineryFuelRegistry.input'
import { MachineryJobRegistryInput } from './inputs/machineryJobRegistry.input'
import { UpdateEquipmentInput } from './inputs/updateEquipment.input'
import { Machinery } from './machinery.schema'
import { MachineryService } from './machinery.service'
import { CreateEquipmentResultUnion } from './outputs/createEquipment.output'
import { DeleteEquipmentResultUnion } from './outputs/deleteEquipment.output'
import { EquipmentsByBookingResultUnion } from './outputs/equipmentsByBooking.output'
import { MachineryFuelRegistryResultUnion } from './outputs/machineryFuelRegistry.output'
import { MachineryJobRegistryResultUnion } from './outputs/machineryJobRegistry.output'
import { UpdateEquipmentResultUnion } from './outputs/updateEquipment.output'

@Resolver()
export class MachineryResolver {

    constructor(private readonly machineryService: MachineryService) {}

    @Query( () => [ Machinery ] )
    async getAllEquipments() {

        return await this.machineryService.getAllEquipments()
    
    }

    @Mutation( () => CreateEquipmentResultUnion)
    async createEquipment(@Args('form') form: EquipmentInput) {

        return await this.machineryService.createEquipment(form)
    
    }

    @Mutation( () => UpdateEquipmentResultUnion)
    async updateEquipment(@Args('form') form: UpdateEquipmentInput) {

        return await this.machineryService.updateEquipment(form)
    
    }

    @Mutation( () => DeleteEquipmentResultUnion)
    async deleteEquipment(@Args('form') form: DeleteEquipmentInput) {

        return await this.machineryService.deleteEquipment(form)
    
    }

    @Query( () => EquipmentsByBookingResultUnion)
    async getAllEquipmentsByBuilding(@Args('user') user: string, @Args('date') date: string) {

        return await this.machineryService.getAllEquipmentsByBuilding(user, date)
    
    }

    @Mutation( () => MachineryJobRegistryResultUnion)
    async createMachineryJobRegistry(@Args('form') form: MachineryJobRegistryInput) {

        return await this.machineryService.createMachineryJobRegistry(form)
    
    }

    @Mutation( () => MachineryFuelRegistryResultUnion)
    async createMachineryFuelRegistry(@Args('form') form: MachineryFuelRegistryInput) {

        return await this.machineryService.createMachineryFuelRegistry(form)
    
    }

}
