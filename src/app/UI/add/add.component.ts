import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Options } from 'ng5-slider';
import { Task } from 'src/app/Model/task';
import { SharedService } from '../../Service/shared.service';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../../Model/User';
import { Project } from '../../Model/Project';
import { SSL_OP_ALLOW_UNSAFE_LEGACY_RENEGOTIATION } from 'constants';




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
  users: User[];
  projects: Project[];
  parenttaskChecked:boolean;
 today:string;
 tomorrow:string;

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

      this._taskservice.getUsers()
      .subscribe(userdata => {
        this.users = userdata;
      });

      this._taskservice.getProjects()
      .subscribe(projdata => {
        this.projects = projdata;
      });
  }

  ngOnInit() {
   
    this.today = new Date().toISOString().split('T')[0];
    var dttomorrow = new Date();
    dttomorrow.setDate( dttomorrow.getDate() +1);
    this.tomorrow=dttomorrow.toISOString().split('T')[0];

    this.addForm = this.formBuilder.group({
      taskId: [],
      taskName: ['', Validators.required],
      ParentId: [''],
      Priority: [''],
      StartDate: ['', Validators.required],
      EndDate: [''],
      ProjectId: ['', Validators.required],
      UserId : ['',Validators.required]
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

  SetParentTask(e)
  {
    this.parenttaskChecked = e.target.checked;
    let parenttaskcontrol =  this.addForm.get('ParentId');
    let prioritycontrol =  this.addForm.get('Priority');
    let usercontrol =  this.addForm.get('UserId');
    let StartDatecontrol = this.addForm.get('StartDate');
    let EndDatecontrol = this.addForm.get('EndDate');
    this.options = Object.assign({}, this.options, {disabled: true});
    if(this.parenttaskChecked)
    {
      parenttaskcontrol.disable();
      prioritycontrol.disable();
      usercontrol.disable();
       StartDatecontrol.disable() ;
       EndDatecontrol.disable();
       this.options = Object.assign({}, this.options, {disabled: true});
 
    }  
     else {
     

       parenttaskcontrol.enable();
       prioritycontrol.enable();
       usercontrol.enable();
      StartDatecontrol.enable();
      EndDatecontrol.enable();
      this.options = Object.assign({}, this.options, {disabled: false});
      }
     

  }

  onReset() {
    this.submitted=false;
    this.addForm.reset();
  }

}





