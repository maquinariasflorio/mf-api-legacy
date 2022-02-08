import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class BillingInput {
    
    @Field()
    name: string;

    @Field()
    rut: string;

    @Field()
    category: string;

    @Field()
    address: string;

    @Field()
    phone: string;

}

@InputType()
export class ClientInput {

    @Field( { nullable: true } )
    _id?: string;

    @Field()
    name: string;

    @Field()
    paymentCondition: string;

    @Field( () => [ String ] )
    receivers: string[];

    @Field( () => BillingInput)
    billing: BillingInput;

}
