import { Test, TestingModule } from '@nestjs/testing';
import { GetTasksController } from './get-tasks.controller';

describe('GetTasksController', () => {
  let controller: GetTasksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GetTasksController],
    }).compile();

    controller = module.get<GetTasksController>(GetTasksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
