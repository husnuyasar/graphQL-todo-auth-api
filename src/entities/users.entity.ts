import { Field, Int, ObjectType } from "@nestjs/graphql";
import { PrimaryGeneratedColumn, Column, Entity } from "typeorm";

@Entity()
@ObjectType()
export class Users {
    @PrimaryGeneratedColumn()
    @Field(()=> Int)
    Id : number;

    @Column()
    @Field()
    FullName : string;

    @Column()
    @Field()
    Email : string;

    @Column()
    @Field()
    Password : string;
}