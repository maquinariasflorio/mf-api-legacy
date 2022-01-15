import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class LoadsInput {

    @Field()
    type: string

    @Field()
    amount: number

}

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
    
    @Field( () => [ LoadsInput ] )
    loads: LoadsInput[];

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
