import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class DeleteEquipmentInput {

    @Field()
    _id: string;

}
