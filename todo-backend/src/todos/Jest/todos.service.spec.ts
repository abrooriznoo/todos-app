import { Test } from '@nestjs/testing';
import { TodosService } from '../todos.service';
import { PrismaService } from '../../../prisma/prisma.service';

describe('TodosService', () => {
  let service: TodosService;
  let prisma: PrismaService;

  const prismaMock = {
    todo: {
      findMany: jest.fn(),
      create: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        TodosService,
        {
          provide: PrismaService,
          useValue: prismaMock,
        },
      ],
    }).compile();

    service = module.get(TodosService);
    prisma = module.get(PrismaService);
  });

  it('should create todo', async () => {
    (prisma.todo.create as jest.Mock).mockResolvedValue({
      id: 1,
      title: 'Test Todo',
      completed: false,
    });

    const result = await service.create({ title: 'Test Todo' });
    expect(result.title).toBe('Test Todo');
  });

  it('should toggle todo', async () => {
    (prisma.todo.findUnique as jest.Mock).mockResolvedValue({
      id: 1,
      completed: false,
    });

    (prisma.todo.update as jest.Mock).mockResolvedValue({
      id: 1,
      completed: true,
    });

    const result = await service.toggle(1);
    expect(result.completed).toBe(true);
  });
});
