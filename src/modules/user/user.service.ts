import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { MongoRepository } from 'typeorm'
import { ObjectId } from 'mongodb'
import { compareSync, hashSync } from 'bcrypt'
import { UserEntity } from './user.entity'

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(UserEntity)
        private usersRepository: MongoRepository<UserEntity>,
    ) {}

    async findUser(conditions: Partial<UserEntity>) {

        return await this.usersRepository.find(conditions)
    
    }
    
    async findOneUser(conditions: Partial<UserEntity>) {

        return await this.usersRepository.findOne(conditions)
    
    }

    async validateCredentials( { email, password } ) {

        const user = await this.findOneUser( { email } )

        if (user && !compareSync(password, user.password) )
            throw new Error('Invalid credentials')
        

        return user
    
    }

    async changePassword( { userId, password }: { userId: ObjectId; password: string } ) {

        const newPassword = hashSync(password.trim(), 10)

        await this.usersRepository.updateOne( { _id: userId }, {
            $set: {
                password: newPassword,
            },
        } )
    
    }

}
