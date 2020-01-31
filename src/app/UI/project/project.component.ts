import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Project } from 'src/app/Model/Project';
import { SharedService } from '../../Service/shared.service';
import { Options } from 'ng5-slider';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { User } from '../../Model/User';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  ProjectName:string;
  Priority:number;
  StartDate:Date ;
  EndDate: Date;
  NoOftasks: number;
  tasksCompleted:number;
  projects: Project[]
  copyprojects: Project[];
  addprojectForm: FormGroup;
  submitted = false;
  SearchValue: string;
  editclicked  = false;
  DateRangechecked = false;
  users: User[];
  today: string;
  tomorrow: string;
  

  
  value: number = 0;
  options: Options = {
    floor: 0,
    ceil: 30
  };
 
  constructor(private service: SharedService, private _router: Router,
    private _route: ActivatedRoute, private formBuilder: FormBuilder) { 
  
    }


  SetDateRange(e) {
   this.DateRangechecked = e.target.checked;
   let StartDatecontrol = this.addprojectForm.get('StartDate');
   let EndDatecontrol = this.addprojectForm.get('EndDate');
   if(this.DateRangechecked)
   {
    StartDatecontrol.enable();
    EndDatecontrol.enable();
    this.today = new Date().toISOString().split('T')[0]; 
    var dttomorrow = new Date();
    dttomorrow.setDate( dttomorrow.getDate() +1);
    this.tomorrow=dttomorrow.toISOString().split('T')[0];

   }  
    else {
      this.tomorrow = '';
      this.today = '';
      StartDatecontrol.disable() ;
      EndDatecontrol.disable();
     }
  } 
  ngOnInit() {
 
    this.service.getUsers()
    .subscribe(data => {
      this.users = data;
      
    });

    this.service.getProjects()
      .subscribe(data => {
        this.projects = data;
        this.copyprojects = this.projects;
      });
      
      
   this.addprojectForm = this.formBuilder.group({
      ProjectId: [],
      ProjectName: ['', Validators.required],
      StartDate: ['', Validators.required],
      EndDate: ['', Validators.required],
      Priority: [],
      UserId: ['',Validators.required],
      CompletedTasks: [''],
      TotalTasks: ['']
      
      
    });
    let StartDatecontrol = this.addprojectForm.get('StartDate');
    let EndDatecontrol = this.addprojectForm.get('EndDate');
    StartDatecontrol.disable() ;
    EndDatecontrol.disable();

  }

  
  get f() { return this.addprojectForm.controls ; }


  onSubmit() {
    this.submitted=true;

    if (this.addprojectForm.invalid) {
      return;
    }

  if(this.editclicked)
  {
    this.service.updateProject(this.addprojectForm.value)
    .pipe(first())
    .subscribe(
      data => {
        alert('Project updated successfully.');
        window.location.reload();
      },
      error => {
        alert(error);
      });
     
      this.addprojectForm.reset();
  }
  else
  {
    this.service.createProject(this.addprojectForm.value)
    .subscribe(data => {
      alert('Project Added successfully.');
      window.location.reload();
    });
  }
    
  this.editclicked = false;
      
       
    }

  onReset() {
    this.submitted=false;
    this.editclicked = false;
    this.addprojectForm.reset();
  }

  
  EditProject(proj:Project)
  {
    this.editclicked = true;
   
    this.service.getProjectById(proj.ProjectId)
    .subscribe(data => {
      this.addprojectForm.setValue(data);
    });

  }

    
  EndProject(proj:Project)
  {
    this.service.EndProject(proj)
      .subscribe(data => {
        alert('Project suspended successfully.');
        window.location.reload();
      },
        error => {
          alert(error);
        });

  }

  deleteProject(proj: Project) {
    this.service.deleteProject(proj.ProjectId).subscribe(data => {
      this.projects = this.projects.filter(u => u !== proj);
    },
    error => {
      alert('Delete All tasks for allocated project before deleting project');
    })

  }

  SortType(sort:string) {
  
    if(sort==='StartDate')
    {
    
      this.projects = this.copyprojects.sort(this.sortByStartDate);
    
    }
    
    if(sort==='EndDate')
    {
    
      this.projects = this.copyprojects.sort(this.sortByEndDate);
    
    }
    
    if(sort==='Priority')
    {
    
      this.projects = this.copyprojects.sort(this.sortByPriority);
      
    }

    if(sort==='Completed')
    {
      this.projects = this.copyprojects.sort(this.sortByCompleted);
    }
  }
      sortByStartDate(p1:Project,p2:Project)
      {
      
        if(p1.StartDate > p2.StartDate) return 1
        else if (p1.StartDate === p2.StartDate) return 0
        else return -1;
      }
    
      sortByEndDate(p1:Project,p2:Project)
      {
      
        if(p1.EndDate > p2.EndDate) return 1
        else if (p1.EndDate === p2.EndDate) return 0
        else return -1;
      }
    
      sortByPriority(p1:Project,p2:Project)
      {
      
        if(p1.Priority > p2.Priority) return 1
        else if (p1.Priority === p2.Priority) return 0
        else return -1;
      }

      sortByCompleted(p1:Project,p2:Project)
      {
      
        if(p1.CompletedTasks < p2.CompletedTasks) return 1
        else if (p1.CompletedTasks === p2.CompletedTasks) return 0
        else return -1;
      }

}


