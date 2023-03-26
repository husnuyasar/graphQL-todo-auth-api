import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class EditTodoInput {
    @Field( {
        nullable : false,
        description: "Todo's Id"
    })
    Id : number

    @Field({
        nullable : false,
        description: "Mark or unmark the todo"
    })
    Checked : boolean;
}