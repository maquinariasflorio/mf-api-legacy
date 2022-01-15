import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class DeleteClientInput {

    @Field()
    _id: string;

}
