import { createUnionType } from '@nestjs/graphql'
import { EquipmentsByBooking, ExternalEquipmentsByBooking } from '../results/equipmentsByBooking.result'

export const EquipmentsByBookingResultUnion = createUnionType( {
    name  : 'EquipmentsByBookingResultUnion',
    types : () => [ EquipmentsByBooking, ExternalEquipmentsByBooking ],
} )
