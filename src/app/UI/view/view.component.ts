import { Component, OnInit, Input, OnChanges, ChangeDetectorRef } from '@angular/core';
import { SharedService } from 'src/app/Service/shared.service'
import { Router, ActivatedRoute } from '@angular/router';
import { Task } from '../../Model/task';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  tasks: Task[];
  nameSearch: '';
  parentSearch: '';
  fromSearch:number;
  toSearch:number;
  sdateSearch:Date;
  edateSearch:Date;
  error: string;

  constructor(private _router: Router, private _route: ActivatedRoute,
    private _taskService: SharedService, private ref: ChangeDetectorRef) {

  }


  ngOnInit() {
    this._taskService.getTasks()
      .subscribe(data => {
        this.tasks = data;
      });
   
  }



  addTask(): void {
    this._router.navigate(['add-task']);
  };

  editTask(task: Task) {
    window.localStorage.removeItem("editTaskId");
    window.localStorage.setItem("editTaskId", task.TaskId.toString());
    this._router.navigate(['edit-task']);
  }

  deleteTask(task: Task) {
    this._taskService.deleteTask(task.TaskId).subscribe(data => {
      this.tasks = this.tasks.filter(u => u !== task);
    })

  }

  EndTask(task: Task) {
    this._taskService.EndTask(task)
      .subscribe(data => {
        alert('Task EndDate updated successfully.');
        window.location.reload();
      },
        error => {
          alert(error);
        });
  }


}

