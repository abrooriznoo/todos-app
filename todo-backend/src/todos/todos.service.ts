import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateTodoDto } from './dto/create-todo.dto';

@Injectable()
export class TodosService {
  constructor(private prisma: PrismaService) {}

  findAll(search?: string) {
    return this.prisma.todo.findMany({
      where: search ? { title: { contains: search, mode: 'insensitive' } } : {},
      orderBy: { id: 'desc' },
    });
  }

  async create(dto: CreateTodoDto) {
    return this.prisma.todo.create({ data: dto });
  }

  async toggle(id: number) {
    const todo = await this.prisma.todo.findUnique({ where: { id } });

    if (!todo) {
      throw new NotFoundException('Todo not found');
    }

    return this.prisma.todo.update({
      where: { id },
      data: { completed: !todo.completed },
    });
  }

  async update(id: number, title: string) {
    const todo = await this.prisma.todo.findUnique({ where: { id } });
    if (!todo) throw new NotFoundException('Todo not found');

    return this.prisma.todo.update({
      where: { id },
      data: { title },
    });
  }

  async remove(id: number) {
    const todo = await this.prisma.todo.findUnique({ where: { id } });
    if (!todo) throw new NotFoundException('Todo not found');

    await this.prisma.todo.delete({ where: { id } });
    return { id };
  }
}
