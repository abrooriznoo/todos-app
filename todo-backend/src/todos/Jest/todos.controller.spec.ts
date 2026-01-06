import { Test } from '@nestjs/testing';
import { TodosController } from '../todos.controller';
import { TodosService } from '../todos.service';

describe('TodosController', () => {
  let controller: TodosController;

  const serviceMock = {
    findAll: jest.fn(),
    create: jest.fn(),
    toggle: jest.fn(),
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [TodosController],
      providers: [{ provide: TodosService, useValue: serviceMock }],
    }).compile();

    controller = module.get(TodosController);
  });

  it('should return todos', async () => {
    serviceMock.findAll.mockResolvedValue([]);
    expect(await controller.findAll()).toEqual([]);
  });
});
