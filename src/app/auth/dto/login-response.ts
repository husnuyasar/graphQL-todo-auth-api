import { Field, ObjectType } from "@nestjs/graphql";
import { Users } from "src/entities/users.entity";

@ObjectType()
export class LoginResponse {
    @Field()
    access_token : string;

    @Field()
    user : Users 
}