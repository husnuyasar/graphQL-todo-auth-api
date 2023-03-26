import { Injectable } from "@nestjs/common";
import { Users } from "src/entities/users.entity";
import { DataSource, EntityRepository, Repository } from "typeorm";
import { CreateUserInput } from "./dto/create-user.input";

@Injectable()
export class UserRepository extends Repository<Users>
{
    constructor(private dataSource: DataSource)
    {
        super(Users, dataSource.createEntityManager());
    }

    async get(email : string) : Promise<Users> {
        return await this.createQueryBuilder('u')
            .where('u.Email =:mail', {mail : email})
            .getOne();
    }

    async add(cretaUserInput : CreateUserInput) : Promise<Users> {
        const user = new Users;
        user.Email = cretaUserInput.Email;
        user.FullName = cretaUserInput.FullName;
        user.Password = cretaUserInput.Password;

        const result = await this.insert(user);
        const newId = result.raw.insertId;

        return await this.createQueryBuilder('u')
                .where('u.Id =:id', {id : newId})
                .getOne();
    }
}