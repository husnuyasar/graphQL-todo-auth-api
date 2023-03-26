import { Field, InputType, Int } from "@nestjs/graphql";
import { type } from "os";
import { CheckStatus } from "../enum/check-status.enum";

@InputType()
export class FilterTodoInput {
    @Field(
        type => Int
        ,{
        nullable: true,
        description: "Select a mark option"
        }
    )
    CheckStatus? : CheckStatus;
}