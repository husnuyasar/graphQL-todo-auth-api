import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CreateUserInput {
    @Field(() => String, {
        nullable : false,
        description: "User's fullname"
    })
    FullName : string;

    @Field(() => String, {
        nullable : false,
        description: "User's email"
    })
    Email : string;
   
    @Field(() => String, {
        nullable : false,
        description: "User's password"
    })
    Password : string;
}