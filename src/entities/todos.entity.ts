import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
@ObjectType()
export class Todos {
    @PrimaryGeneratedColumn()
    @Field(()=> Int)
    Id : number;

    @Column()
    @Field()
    Description : string;

    @Column()
    @Field()
    Checked : boolean;

}