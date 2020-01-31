import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../../Model/task';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from '../../Service/shared.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Options } from 'ng5-slider';
import { User } from '../../Model/User';
import { Project } from '../../Model/Project';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
submitted = false;
  editForm: FormGroup;
  tasks: Task[];
  users: User[];
  projects: Project[];
  value: number = 15;
  options: Options = {
    floor: 0,
    ceil: 30
  };


  constructor(private _route: ActivatedRoute,
    private _router: Router,
    private _taskService: SharedService,
    private formBuilder: FormBuilder) {

    this._taskService.GetParentTasks()
      .subscribe(data => {
        this.tasks = data;
      });

      this._taskService.getUsers()
      .subscribe(userdata => {
        this.users = userdata;
      });

      this._taskService.getProjects()
      .subscribe(projdata => {
        this.projects = projdata;
      });
  }

  ngOnInit() {
    this.editForm = this.formBuilder.group({
      TaskId: [''],
      TaskName: [''],
      ParentId: [''],
      ParentTask: [''],
      Priority: [''],
      StartDate: ['', Validators.required],
      EndDate: [''],
      UserId : [''],
      ProjectId: [''],
      Status: ['']
    });

    

    let taskId = window.localStorage.getItem("editTaskId");
    this._taskService.getTaskById(+taskId)
      .subscribe(data => {
        this.editForm.setValue(data);
  
      });

    if (!taskId) {
      alert("Invalid action.")
      this._router.navigate(['view-task']);
      return;
    }
  }

  onCancel() {
    this.submitted=false;
    this._router.navigate(['view-task']);
  }

  get f() { return this.editForm.controls; }

  onSubmit() {

this.submitted =true;

if (this.editForm.invalid) {
  return;
}
    this._taskService.updateTask(this.editForm.value)
      .pipe(first())
      .subscribe(
        data => {
          alert('Task updated successfully.');
          this._router.navigate(['view-task']);
        },
        error => {
          alert(error);
        });
  }

}
