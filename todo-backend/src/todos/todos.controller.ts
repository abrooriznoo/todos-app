import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Body,
  Query,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { Put, Delete } from '@nestjs/common';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { successResponse } from '../common/utils/response.util';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Get()
  async findAll(@Query('search') search?: string) {
    const todos = await this.todosService.findAll(search);
    return successResponse(todos, 'Todos fetched successfully');
  }

  @Post()
  async create(@Body() dto: CreateTodoDto) {
    const todo = await this.todosService.create(dto);
    return successResponse(todo, 'Todo created');
  }

  @Patch(':id')
  async toggle(@Param('id') id: string) {
    const todo = await this.todosService.toggle(+id);
    return successResponse(todo, 'Todo updated');
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateTodoDto) {
    const todo = await this.todosService.update(+id, dto.title);
    return successResponse(todo, 'Todo updated');
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const result = await this.todosService.remove(+id);
    return successResponse(result, 'Todo deleted');
  }
}
