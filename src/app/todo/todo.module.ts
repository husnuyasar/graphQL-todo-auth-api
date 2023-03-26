import { Module } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoResolver } from './todo.resolver';
import { TodoRepository } from './todo.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todos } from 'src/entities/todos.entity';

@Module({
  imports : [
    TypeOrmModule.forFeature([Todos])
  ],
  providers: [TodoService, TodoResolver, TodoRepository]
})
export class TodoModule {}
