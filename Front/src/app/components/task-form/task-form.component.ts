import { Component, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TaskService } from '../../service/task.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from '../../interfaces/task';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.css'
})
export class TaskFormComponent implements OnInit{
  
  constructor(
    private taskServices: TaskService,
    private router: Router,
    private activeRouter: ActivatedRoute
  ){}

  edit = false

  task: Task = {
    id: 0,
    titulo: '',
    descripcion: ''
  }

  
  form = signal<FormGroup>(
    new FormGroup({
      titulo: new FormControl(''),
      descripcion: new FormControl('')
    })
  )

  ngOnInit(): void {
    const params = this.activeRouter.snapshot.params
    this.taskServices.findOne(params['id'])
      .subscribe({
        next: res => {
          this.task = res
          this.form.set(new FormGroup({
            titulo: new FormControl(this.task.titulo),
            descripcion: new FormControl(this.task.descripcion)
          }))
          this.edit = true
        }
      })
  }

  newTask(){
    const newTask = {
      titulo: this.form().value.titulo,
      descripcion: this.form().value.descripcion
    }
    return newTask
  }


  createTask(){
    this.taskServices.create(this.newTask())
      .subscribe({
        next: res => {
          console.log(res)
          this.router.navigate(['taskList'])
        },
        error: err => console.log(err)
      })
  }

  updateTask(){
    this.taskServices.update(this.task.id+'', this.newTask())
      .subscribe({
        next: res => {
          console.log(res)
          this.router.navigate(['taskList'])
        },
        error: err => console.log(err)
      })
  }

}
