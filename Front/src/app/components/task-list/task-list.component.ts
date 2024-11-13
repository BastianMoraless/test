import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TaskService } from '../../service/task.service';
import { Task } from '../../interfaces/task';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent implements OnInit{

  tasks:Task[] = []

  constructor(
    private taskServices: TaskService
  ){}

  ngOnInit(): void {
    this.findAllTask()
  }

  findAllTask(){
    this.taskServices.findAll()
      .subscribe({
        next: (res) => {
          this.tasks = res
        },
        error: err => console.log(err)
      })
  }

  removeTask(id:string){
    this.taskServices.remove(id)
      .subscribe({
        next: res => {
          this.findAllTask()
        },
        error: err => console.log(err)
      })
  }

}
