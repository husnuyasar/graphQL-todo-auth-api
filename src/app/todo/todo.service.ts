import { Injectable } from '@nestjs/common';
import { Todos } from 'src/entities/todos.entity';
import { EditTodoInput } from './dto/edit-todo.input';
import { FilterTodoInput } from './dto/filter-todo-input';
import { TodoRepository } from './todo.repository';

@Injectable()
export class TodoService {
    constructor(
        private readonly todoRepository : TodoRepository
    ) {}

    async getAll(filter? : FilterTodoInput) : Promise<Todos []> {
        return await this.todoRepository.getAll(filter);
    }

    async create(todo : string) : Promise<Todos []> {
        await this.todoRepository.add(todo);
        return await this.getAll();
    }

    async delete(id : number) : Promise<Todos []> {
        await this.todoRepository.delete(id);
        return await this.getAll();
    }

    async edit(dto : EditTodoInput) : Promise<Todos []> {
        await this.todoRepository.edit(dto);
        return await this.getAll()
    }
}
