import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Options } from 'ng5-slider';
import { Task } from 'src/app/Model/task';
import { SharedService } from '../../Service/shared.service';
import { Router, ActivatedRoute } from '@angular/router';




@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
 TaskName:string;
 ParentTask:string;
 StartDate:Date;
 EndDate:Date;
  tasks: Task[];
  addForm: FormGroup;
  submitted = false;

  value: number = 15;
  options: Options = {
    floor: 0,
    ceil: 30
  };

  constructor(private _taskservice: SharedService, private _router: Router,
    private _route: ActivatedRoute, private formBuilder: FormBuilder) {
    this._taskservice.GetParentTasks()
      .subscribe(data => {
        this.tasks = data;
      });
  }

  ngOnInit() {

    this.addForm = this.formBuilder.group({
      taskId: [],
      taskName: ['', Validators.required],
      ParentId: [''],
      Priority: [''],
      StartDate: ['', Validators.required],
      EndDate: [''],
    });
  }

  get f() { return this.addForm.controls; }


  onSubmit() {
this.submitted=true;

if (this.addForm.invalid) {
  return;
}
    this._taskservice.createTask(this.addForm.value)
      .subscribe(data => {
        this._router.navigate(['view-task']);
      });

  }

  onReset() {
    this.submitted=false;
    this.addForm.reset();
  }

}





