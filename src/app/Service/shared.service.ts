import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient} from '@angular/common/http';

import { Task } from '../Model/task';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
 
 url:string="http://localhost:50119/";
  constructor(private http:HttpClient) { }

  GetAll():Observable<any>
  {
    return this.http.get(this.url+"api/Task");
    //.pipe(map((res : Response) => res.json ));
    
  }

Get(taskId):Observable<any>
  {
  return this.http.get(this.url+"api/Task/"+taskId);
  }  


  // Add(item:Task):Observable<any>
  // {
  //   return this.http.get(this.url+"Add").pipe(map(res: Response)));
  // }

  // Edit(item:Task):Observable<any>
  // {
  //   return this.http.get(this.url+"Edit").pipe(map(res: Response)));
  // }
}
