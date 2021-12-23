import * as mongoose from 'mongoose'
import { Injectable } from '@nestjs/common'
import { InjectModel, InjectConnection } from '@nestjs/mongoose'
import { ObjectId } from 'mongodb'
import { Model } from 'mongoose'
import { Ok } from 'src/commons/results/ok.result'
import { Client, ClientDocument } from './client.schema'
import { DeleteClientInput } from './inputs/deleteClient.input'
import { UpdateClientInput } from './inputs/updateClient.input'
import { ClientNotFound } from './results/clientNotFound.result'
import { ClientInput } from './inputs/client.input'

@Injectable()
export class ClientService {

    constructor(
        @InjectModel(Client.name)
        private clientModel: Model<ClientDocument>,
        @InjectConnection()
        private readonly connection: mongoose.Connection,
    ) {}

    async findClient(conditions: Record<string, unknown>) {

        return await this.clientModel.find(conditions).lean()
    
    }
    
    async findOneClient(conditions: Record<string, unknown>, projection?) {

        return await this.clientModel.findOne(conditions, projection).lean()
    
    }

    async getAll() : Promise<Client[]> {

        return await this.clientModel.find().lean()

    }

    async createClient(client: ClientInput) {

        const session = await this.connection.startSession()
        session.startTransaction()
            
        const newClient = new this.clientModel( {
            ...client,
        } )
    
        try {

            await newClient.save()
            await session.commitTransaction()

            return new Ok( { message: 'Client created successfully' } )
        
        }
        catch (error) {

            await session.abortTransaction()
            throw error
        
        }
        finally {

            session.endSession()
        
        }
    
    }

    async deleteClient(client: DeleteClientInput) {

        const existClient = await this.findOneClient( { _id: new ObjectId(client._id) } )

        if (!existClient)
            return new ClientNotFound()

        await this.clientModel.deleteOne( { _id: new ObjectId(client._id) } )

        return new Ok( { message: 'Client deleted successfully' } )
    
    }

    async updateClient(client: UpdateClientInput) {

        const existClient = await this.findOneClient( { _id: new ObjectId(client._id) } )

        if (!existClient)
            return new ClientNotFound()
 
        await this.clientModel.updateOne( { _id: new ObjectId(client._id) }, {
            $set: {
                ...client,
                receivers: client.receivers.map(receiver => receiver.toLowerCase() ),
            },
        } )

        return new Ok( { message: 'Client updated successfully' } )
    
    }

}
