import { Injectable } from "@nestjs/common";
import { Todos } from "src/entities/todos.entity";
import { DataSource, Repository } from "typeorm";
import { EditTodoInput } from "./dto/edit-todo.input";
import { FilterTodoInput } from "./dto/filter-todo-input";
import { CheckStatus } from "./enum/check-status.enum";

@Injectable()
export class TodoRepository extends Repository<Todos>
{
    constructor(private dataSource: DataSource)
    {
        super(Todos, dataSource.createEntityManager());
    }

    async getAll(filter? : FilterTodoInput) : Promise<Todos []> {
        const todos = await this.createQueryBuilder('t')
                    .orderBy('t.Id',"DESC");
        if (filter && filter.CheckStatus) {
            const status = filter.CheckStatus == CheckStatus.COMPLETED;
            todos.andWhere('t.Checked =:checked', {checked : status});
        }
        return await todos.getMany();
    }

    async add(todoString : string) : Promise<Todos> {
        const todo = new Todos;
        todo.Description = todoString;

        const result = await this.insert(todo);
        const newId = result.raw.insertId;

        return await this.createQueryBuilder('t')
                .where('t.Id =:id', {id : newId})
                .getOne();
    }

    async edit(dto : EditTodoInput) : Promise<Todos>{
        const todo =  await this.createQueryBuilder('t')
                    .where('t.Id =:id', {id : dto.Id})
                    .getOne();
        if(!todo){
            throw new Error("Todo is not found!");
        }
        todo.Checked = dto.Checked;
        await this.save(todo);
        return todo;
    }
}