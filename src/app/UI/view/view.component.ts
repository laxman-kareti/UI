import { Component, OnInit, Input, OnChanges, ChangeDetectorRef } from '@angular/core';
import { SharedService } from 'src/app/Service/shared.service'
import { Router, ActivatedRoute } from '@angular/router';
import { Task } from '../../Model/task';
import {Project} from '../../Model/Project';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as $ from 'jquery';


@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  tasks: Task[];
  projects: Project[];
  copytasks:Task[];
  nameSearch: '';
  parentSearch: '';
  fromSearch:number;
  toSearch:number;
  sdateSearch:Date;
  edateSearch:Date;
  error: string;
  projectId:number;

  constructor(public modalService: NgbModal, private _router: Router, private _route: ActivatedRoute,
    private _taskService: SharedService, private ref: ChangeDetectorRef) {

  }


  ngOnInit() {
   
      this._taskService.getProjects()
      .subscribe(projdata => {
        this.projects = projdata;
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

  Search() {
       this._taskService.getTasks(this.projectId)
      .subscribe(data => {
        this.tasks = data;
        this.copytasks= this.tasks;
      });
 
  }

  SortType(sort:string) {
  
    if(sort==='StartDate')
    {
    
      this.tasks = this.copytasks.sort(this.sortByStartDate);
    
    }
    
    if(sort==='EndDate')
    {
    
      this.tasks = this.copytasks.sort(this.sortByEndDate);
    
    }
    
    if(sort==='Priority')
    {
    
      this.tasks = this.copytasks.sort(this.sortByPriority);
      
    }

    if(sort==='Completed')
    {
    
      this.tasks = this.copytasks.sort(this.sortByCompleted);
      
    }
    
      }
      sortByStartDate(t1:Task,t2:Task)
      {
      
        if(t1.StartDate > t2.StartDate) return 1
        else if (t1.StartDate === t2.StartDate) return 0
        else return -1;
      }
    
      sortByEndDate(t1:Task,t2:Task)
      {
      
        if(t1.EndDate > t2.EndDate) return 1
        else if (t1.EndDate === t2.EndDate) return 0
        else return -1;
      }
    
      sortByCompleted(t1:Task,t2:Task)
     {
      if(t1.Status > t2.Status) return 1
      else if (t1.Status === t2.Status) return 0
      else return -1;
     }
      sortByPriority(t1:Task,t2:Task)
      {
      
        if(t1.Priority > t2.Priority) return 1
        else if (t1.Priority === t2.Priority) return 0
        else return -1;
      }

}

