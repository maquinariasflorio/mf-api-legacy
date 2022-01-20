import { ObjectType, Field, createUnionType } from '@nestjs/graphql'
import { Client } from 'src/modules/client/client.schema'
import { Machinery } from 'src/modules/machinery/machinery.schema'

@ObjectType()
export class PayStateFilterExternalMachine {

    @Field( () => String)
    name: string;

    @Field( () => [ String ] )
    fromBuilding: string[];

    @Field( () => [ String ] )
    fromClient: string[];

}

@ObjectType()
export class PayStateFilterInternalMachine extends Machinery {

    @Field( () => [ String ] )
    fromBuilding: string[];

    @Field( () => [ String ] )
    fromClient: string[];

}

const PayStateFilterMachine = createUnionType( {
    name        : "PayStateFilterMachine",
    types       : () => [ PayStateFilterExternalMachine, PayStateFilterInternalMachine ],
    resolveType : (value) => {

        if (value._id)
            return PayStateFilterInternalMachine
        
        return PayStateFilterExternalMachine
    
    },
} )

@ObjectType()
export class PayStateFilterBuilding {

    @Field( () => String)
    clientId: string;
    
    @Field( () => String)
    name: string;

}

@ObjectType()
export class PayStateFilters {

    @Field( () => [ Client ] )
    clients: Client[];

    @Field( () => [ PayStateFilterBuilding ] )
    buildings: PayStateFilterBuilding[];
    
    @Field( () => [ PayStateFilterMachine ] )
    equipments: typeof PayStateFilterMachine[];

}
