import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Todos } from 'src/entities/todos.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { EditTodoInput } from './dto/edit-todo.input';
import { FilterTodoInput } from './dto/filter-todo-input';
import { TodoService } from './todo.service';

@Resolver(() => Todos)
export class TodoResolver {

    constructor(
        private todoService : TodoService
    ) {}

    @Query(returns => [Todos])
    @UseGuards(JwtAuthGuard)
    async getAll(@Args('filter', {type:()=> FilterTodoInput}) filter : FilterTodoInput) {
        return this.todoService.getAll(filter);
    }

    @Mutation(returns => [Todos])
    @UseGuards(JwtAuthGuard)
    async addTodo(@Args('todo') todo : string) {
        return this.todoService.create(todo);
    }

    @Mutation(returns => [Todos])
    @UseGuards(JwtAuthGuard)
    async deleteTodo(@Args('id') id : number) {
        return this.todoService.delete(id);
    }

    @Mutation(returns => [Todos])
    @UseGuards(JwtAuthGuard)
    async editTodo(@Args('editTodoInput') editTodoInput : EditTodoInput) {
        return this.todoService.edit(editTodoInput);
    }
}
