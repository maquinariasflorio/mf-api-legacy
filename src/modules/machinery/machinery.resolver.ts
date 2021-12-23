import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { DeleteEquipmentInput } from './inputs/deleteEquipment.input'
import { EquipmentInput } from './inputs/equipment.input'
import { UpdateEquipmentInput } from './inputs/updateEquipment.input'
import { Machinery } from './machinery.schema'
import { MachineryService } from './machinery.service'
import { CreateEquipmentResultUnion } from './outputs/createEquipment.output'
import { DeleteEquipmentResultUnion } from './outputs/deleteEquipment.output'
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

}
