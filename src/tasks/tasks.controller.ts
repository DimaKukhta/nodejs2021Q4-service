import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import { AuthGuard } from 'src/login/guards/auth.guard';

@Controller('boards')
@UseGuards(AuthGuard)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post(':boardId/tasks')
  create(
    @Param('boardId') boardId: string,
    @Body() createTaskDto: CreateTaskDto,
  ) {
    const task = createTaskDto as Task;
    task.boardId = boardId;
    return this.tasksService.create(task);
  }

  @Get(':boardId/tasks')
  findAll() {
    return this.tasksService.findAll();
  }

  @Get(':boardId/tasks/:id')
  findOne(@Param('id') id: string) {
    return this.tasksService.findOne(id);
  }

  @Put(':boardId/tasks/:id')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.update(id, updateTaskDto);
  }

  @Delete(':boardId/tasks/:id')
  remove(@Param('id') id: string) {
    return this.tasksService.remove(id);
  }
}
