import { ObjectType, Field, createUnionType } from '@nestjs/graphql'
import { Machinery } from 'src/modules/machinery/machinery.schema'
import { User } from 'src/modules/user/user.schema'
import { Booking, BookingMachinery } from '../booking.schema'

@ObjectType()
export class ExternalMachine extends BookingMachinery {}

@ObjectType()
export class InternalMachine extends BookingMachinery {
    
    @Field( () => Machinery)
    equipment: Machinery;

    @Field( () => User)
    operator: User;

}

const Machine = createUnionType( {
    name        : "Machine",
    types       : () => [ ExternalMachine, InternalMachine ],
    resolveType : (value) => {

        switch (typeof value.equipment) {

            case 'object':
                return InternalMachine
            case 'string':
                return ExternalMachine
        
        }
    
    },
} )

@ObjectType()
export class FullBooking extends Booking {
    
    @Field( () => [ Machine ] )
    machines: typeof Machine[];

}
