import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import {  catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Task } from '../Model/task';
import {User} from '../Model/User';
import {Project} from '../Model/Project';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class SharedService {

  url: string = "http://localhost:8090/api/";
  constructor(private httpClient: HttpClient) { }


  getTasks(id:number):Observable<any> {
    return this.httpClient.get<any>
    (this.url + 'task/GetAllTasks/' + id)
      .pipe(catchError(this.handleError));
  }

  getUsers():Observable<any> {
    return this.httpClient.get<any>
    (this.url + 'User/GetAllUsers')
      .pipe(catchError(this.handleError));
  }

  getProjects():Observable<any> {
    return this.httpClient.get<any>
    (this.url + 'Project/GetAllProjects')
      .pipe(catchError(this.handleError));
  }

  
  GetParentTasks():Observable<any> {
    return this.httpClient.get<any>
    (this.url + 'task/ParentTask')
      .pipe(catchError(this.handleError));
  }

 

  private handleError(errorResponse: HttpErrorResponse) {
    if (errorResponse.error instanceof ErrorEvent) {
      console.error('Client Side Error: ', errorResponse.error.message);
    } else {
      console.error('Server Side Error: ', errorResponse);
    }

    return  throwError('There is a problem with the service. We are notified & working on it. Please try again later.');
  }

  getProjectById(id: number): Observable<any> {
    return this.httpClient.get<any>
    (this.url +  'Project/GetProjectById/' + id)
      .pipe(catchError(this.handleError));
  }
  getTaskById(id: number): Observable<any> {
    return this.httpClient.get<any>
    (this.url +  'task/GettaskById/' + id)
      .pipe(catchError(this.handleError));
  }

  getUserById(id: number): Observable<any> {
    return this.httpClient.get<any>
    (this.url +  'User/GetUserById/' + id)
      .pipe(catchError(this.handleError));
  }

  createTask(task: Task): Observable<any> {
    return this.httpClient.post<any>
    (this.url + 'task/CreateTask', task,{
      headers: new HttpHeaders({
          'Content-Type': 'application/json',
         
      })
  })
    .pipe(catchError(this.handleError));
  }

  createUser(user: User): Observable<any> {
    return this.httpClient.post<any>
    (this.url + 'user/CreateUser' , user,{
      headers: new HttpHeaders({
          'Content-Type': 'application/json',
         
      })
  })
    .pipe(catchError(this.handleError));
  }

  
  createProject(proj: Project): Observable<any> {
    return this.httpClient.post<any>
    (this.url + 'project/CreateProject', proj,{
      headers: new HttpHeaders({
          'Content-Type': 'application/json',
         
      })
  })
    .pipe(catchError(this.handleError));
  }

  
  updateTask(task: Task): Observable<any> {
    return this.httpClient.put<any>
    (this.url + 'task/UpdateTask/' + task.TaskId, task);
  }

  updateUser(user: User): Observable<any> {
    return this.httpClient.put<any>
    (this.url + 'user/UpdateUser/' + user.UserId, user);
  }

  updateProject(proj: Project): Observable<any> {
    return this.httpClient.put<any>
    (this.url + 'project/UpdateProject/' + proj.ProjectId, proj);
  }

  
  EndTask(task: Task): Observable<any> {
    return this.httpClient.put<any>
    (this.url + 'task/EndTask/' + task.TaskId, task);
  }

  EndProject(proj: Project): Observable<any> {
    return this.httpClient.put<any>
    (this.url + 'project/EndProject/' + proj.ProjectId, proj);
  }

  deleteTask(id: number): Observable<any> {
    return this.httpClient.delete<any>
    (this.url + 'task/DeleteTask/' + id);
  }

  
  deleteUser(id: number): Observable<any> {
    return this.httpClient.delete<any>
    (this.url + 'user/DeleteUser/' + id);
  }

  
  deleteProject(id: number): Observable<any> {
    return this.httpClient.delete<any>
    (this.url + 'Project/DeleteProject/' + id);
  }



}
