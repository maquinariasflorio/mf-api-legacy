import { Field, ObjectType } from "@nestjs/graphql"

@ObjectType()
export class PaginationResult {
    
    @Field( () => String)
    next: string;

    @Field( () => Boolean)
    hasNext: boolean;

    @Field( () => String, { nullable: true } )
    previous: string;

    @Field( () => Boolean, { nullable: true } )
    hasPrevious: boolean;

}
