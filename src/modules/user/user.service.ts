import { Injectable } from '@nestjs/common'
import { ObjectId } from 'mongodb'
import { compareSync, hashSync } from 'bcrypt'
import { InjectConnection, InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { MailerService } from '@nestjs-modules/mailer'
import { Ok } from 'src/commons/results/ok.result'
import * as mongoose from 'mongoose'
import { UserNotFound } from './results/userNotFound.result'
import { DeleteUserInput } from './inputs/deleteUser.input'
import { UpdateUserInput } from './inputs/updateUser.input'
import { ImmutableUser } from './results/immutableUser.result'
import { UserAlreadyExists } from './results/userAlreadyExists.result'
import { User, UserDocument } from './user.schema'
import { UserInput } from './inputs/user.input'

@Injectable()
export class UserService {

    constructor(
        @InjectModel(User.name)
        private userModel: Model<UserDocument>,
        @InjectConnection()
        private readonly connection: mongoose.Connection,
        private readonly mailerService: MailerService,
    ) {}

    async findUser(conditions?: Record<string, unknown>) {

        return await this.userModel.find(conditions).lean()
    
    }
    
    async findOneUser(conditions: Record<string, unknown>, projection?) {

        return await this.userModel.findOne(conditions, projection).lean()
    
    }

    async validateCredentials( { email, password } ) {

        const user = await this.findOneUser( { email } )

        if (user && !compareSync(password, user.password) )
            throw new Error('Invalid credentials')
        

        return user
    
    }

    async changePassword( { userId, password }: { userId: ObjectId; password: string } ) {

        const newPassword = hashSync(password.trim(), 10)

        await this.userModel.updateOne( { _id: userId }, {
            $set: {
                password: newPassword,
            },
        } )
    
    }

    async getAllWithoutSystemAdmin() : Promise<User[]> {
            
        return await this.userModel.find( {
            isSystemAdmin: {
                $ne: true,
            },
        }, {
            password: false,
        } ).lean()
    
    }

    async getAllUsersWithRoleName(roleName) : Promise<User[]> {
            
        return await this.userModel.aggregate( [
            {
                $lookup: {
                    from         : 'role',
                    localField   : 'role',
                    foreignField : '_id',
                    as           : 'role',
                },
            },
            {
                $unwind: {
                    path                       : "$role",
                    preserveNullAndEmptyArrays : false,
                },
            },
            {
                $match: {
                    "isSystemAdmin": {
                        $ne: true,
                    },

                    "role.name": roleName,
                },
            },
            {
                $project: {
                    role: false,
                },
            },
        ] )
    
    }

    async createUser(user: UserInput) {

        const session = await this.connection.startSession()
        session.startTransaction()

        const newPassword = this.generatePasswordByRut(user.rut)
            
        const newUser = new this.userModel( {
            ...user,
            email    : user.email.trim().toLowerCase(),
            isActive : true,
            password : hashSync(newPassword, 10),
        } )
    
        try {

            await newUser.save()
        
            return await this.mailerService.sendMail( {
                to      : user.email.toLowerCase(),
                from    : `"No Reply" <${process.env.SMTP_USER}>`,
                subject : 'Maquinarias Florio - Usuario creado',
                text    : `Su usuario ha sido creado con éxito. Su contraseña es: ${newPassword}. Por su seguridad, recomendamos cambiarla al ingresar al sistema.`,
                html    : `<p>Su usuario ha sido creado con éxito. Su contraseña es: <b>${newPassword}</b>. Por su seguridad, recomendamos cambiarla al ingresar al sistema.</p>`,
            } )
                .then(async () => {
    
                    await session.commitTransaction()

                    return new Ok( { message: 'User created successfully' } )
                
                } )
        
        }
        catch (error) {

            await session.abortTransaction()

            if (error.code === 11000)
                return new UserAlreadyExists( { rut: user.rut } )
            else
                throw error
        
        }
        finally {

            session.endSession()
        
        }
    
    }

    private generatePasswordByRut(rut: string) {

        const rutWithoutDotsAndDashes = rut.replace(/[.-]/g, '')

        return rutWithoutDotsAndDashes.substr(0, 4)
    
    }

    async deleteUser(user: DeleteUserInput) {

        const existUser = await this.findOneUser( { _id: new ObjectId(user._id) } )

        if (!existUser)
            return new UserNotFound( { message: `User not found` } )
        
        if (existUser.isSystemAdmin)
            return new ImmutableUser( { _id: user._id } )

        await this.userModel.deleteOne( { _id: new ObjectId(user._id) } )

        return new Ok( { message: 'User deleted successfully' } )
    
    }

    async updateUser(user: UpdateUserInput) {

        const existUser = await this.findOneUser( { _id: new ObjectId(user._id) } )

        if (!existUser)
            return new UserNotFound( { message: `User not found` } )

        if (existUser.isSystemAdmin)
            return new ImmutableUser( { _id: user._id } )
 
        await this.userModel.updateOne( { _id: new ObjectId(user._id) }, {
            $set: {
                ...user,
                email: user.email.trim().toLowerCase(),
            },
        } )

        return new Ok( { message: 'User updated successfully' } )
    
    }

}
