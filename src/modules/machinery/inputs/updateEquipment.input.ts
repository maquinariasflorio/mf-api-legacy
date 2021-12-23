import { Field, InputType } from '@nestjs/graphql'
import { EquipmentInput } from './equipment.input'

@InputType()
export class UpdateEquipmentInput extends EquipmentInput {

    @Field()
    _id: string;

}
