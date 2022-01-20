import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class PayStatesFilter {

    @Field()
    startDate: string;

    @Field()
    endDate: string;

    @Field( { nullable: true } )
    client?: string;

    @Field( { nullable: true } )
    building?: string;

    @Field( { nullable: true } )
    equipment?: string;

}
