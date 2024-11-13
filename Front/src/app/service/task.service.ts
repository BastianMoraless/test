import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../interfaces/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  BASE_URL = "http://localhost:3000"

  constructor(
    private http: HttpClient
  ) { }

  findAll():Observable<Task[]>{
    return this.http.get<Task[]>(`${this.BASE_URL}/task/`)
  }

  findOne(id: string):Observable<Task>{
    return this.http.get<Task>(`${this.BASE_URL}/task/${id}`)
  }

  create(newTask: Task):Observable<Task>{
    return this.http.post<Task>(`${this.BASE_URL}/task/`,newTask)
  }

  remove(id: string){
    return this.http.delete<Task>(`${this.BASE_URL}/task/${id}`)
  }

  update(id:string, updateTask:Task):Observable<Task>{
    return this.http.put<Task>(`${this.BASE_URL}/task/${id}/`,updateTask)
  }
}
