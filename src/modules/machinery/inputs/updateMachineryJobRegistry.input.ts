import { Field, InputType } from '@nestjs/graphql'
import { MachineryJobRegistryInput } from './machineryJobRegistry.input'

@InputType()
export class UpdateMachineryJobRegistryInput extends MachineryJobRegistryInput {

    @Field()
    _id: string;

    @Field()
    executor: string;

}
