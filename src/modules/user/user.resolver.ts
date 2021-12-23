import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { DeleteUserInput } from './inputs/deleteUser.input'
import { UpdateUserInput } from './inputs/updateUser.input'
import { UserInput } from './inputs/user.input'
import { CreateUserResultUnion } from './outputs/createUser.output'
import { DeleteUserResultUnion } from './outputs/deleteUser.output'
import { UpdateUserResultUnion } from './outputs/updateUser.output'
import { User } from './user.schema'
import { UserService } from './user.service'

@Resolver()
export class UserResolver {

    constructor(private readonly userService: UserService) {}

    @Query( () => [ User ] )
    async getAllUsers() {

        return await this.userService.getAllWithoutSystemAdmin()
    
    }

    @Mutation( () => CreateUserResultUnion)
    async createUser(@Args('form') form: UserInput) {

        return await this.userService.createUser(form)
    
    }

    @Mutation( () => UpdateUserResultUnion)
    async updateUser(@Args('form') form: UpdateUserInput) {

        return await this.userService.updateUser(form)
    
    }

    @Mutation( () => DeleteUserResultUnion)
    async deleteUser(@Args('form') form: DeleteUserInput) {

        return await this.userService.deleteUser(form)
    
    }

}
