import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class DeleteMachineryFuelRegistryInput {

    @Field()
    _id: string;

}
