import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import {  catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Task } from '../Model/task';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class SharedService {

  url: string = "http://localhost:8090/api/task/";
  constructor(private httpClient: HttpClient) { }


  getTasks():Observable<any> {
    return this.httpClient.get<any>
    (this.url + 'GetAllTasks')
      .pipe(catchError(this.handleError));
  }

  
  GetParentTasks():Observable<any> {
    return this.httpClient.get<any>
    (this.url + 'ParentTask')
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

  getTaskById(id: number): Observable<any> {
    return this.httpClient.get<any>
    (this.url +  'GettaskById/' + id)
      .pipe(catchError(this.handleError));
  }

  createTask(task: Task): Observable<any> {
    return this.httpClient.post<any>
    (this.url, task,{
      headers: new HttpHeaders({
          'Content-Type': 'application/json',
         
      })
  })
    .pipe(catchError(this.handleError));
  }

  updateTask(task: Task): Observable<any> {
    return this.httpClient.put<any>
    (this.url + 'UpdateTask/' + task.TaskId, task);
  }

  
  EndTask(task: Task): Observable<any> {
    return this.httpClient.put<any>
    (this.url + 'EndTask/' + task.TaskId, task);
  }

  deleteTask(id: number): Observable<any> {
    return this.httpClient.delete<any>
    (this.url + 'DeleteTask/' + id);
  }



}
