import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { Client } from './client.schema'
import { ClientService } from './client.service'
import { ClientInput } from './inputs/client.input'
import { DeleteClientInput } from './inputs/deleteClient.input'
import { UpdateClientInput } from './inputs/updateClient.input'
import { CreateClientResultUnion } from './outputs/createClient.output'
import { DeleteClientResultUnion } from './outputs/deleteClient.output'
import { UpdateClientResultUnion } from './outputs/updateClient.output'

@Resolver()
export class ClientResolver {

    constructor(private readonly clientService: ClientService) {}

    @Query( () => [ Client ] )
    async getAllClients() {

        return await this.clientService.getAll()
    
    }

    @Mutation( () => CreateClientResultUnion)
    async createClient(@Args('form') form: ClientInput) {

        return await this.clientService.createClient(form)
    
    }

    @Mutation( () => UpdateClientResultUnion)
    async updateClient(@Args('form') form: UpdateClientInput) {

        return await this.clientService.updateClient(form)
    
    }

    @Mutation( () => DeleteClientResultUnion)
    async deleteClient(@Args('form') form: DeleteClientInput) {

        return await this.clientService.deleteClient(form)
    
    }

}
