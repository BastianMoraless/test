import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';

@Injectable()
export class TaskService {

  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>
  ){}

  async create(createTaskDto: CreateTaskDto) {
    const newTask = this.taskRepository.create(createTaskDto)
    return await this.taskRepository.save(newTask)
  }

  findAll() {
    return this.taskRepository.find()
  }

  findOne(id: number) {
    return this.taskRepository.findOneBy({id})
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    return await this.taskRepository.update(id, updateTaskDto)
  }

  async remove(id: number) {
    return await this.taskRepository.delete(id)
  }
}
