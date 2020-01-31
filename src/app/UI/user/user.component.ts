import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/Model/User';
import { SharedService } from '../../Service/shared.service';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { $ } from 'protractor';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  FirstName:string;
 LastName:string;
 EmployeeId:number;
  users: User[];
  copyusers: User[];
  adduserForm: FormGroup;
  submitted = false;
  editclicked  = false;
  SearchValue :string;


  constructor(private service: SharedService, private _router: Router,
    private _route: ActivatedRoute, private formBuilder: FormBuilder) {

  }
  
 
  ngOnInit() {

    this.service.getUsers()
      .subscribe(data => {
        this.users = data;
        this.copyusers = this.users;
      });

   this.adduserForm = this.formBuilder.group({
      UserId: [''],
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required],
      EmployeeId: ['', Validators.required],
    
    
      
    });
  }

  get f() { return this.adduserForm.controls ; }


  onSubmit() {
  this.submitted=true;
  

if (this.adduserForm.invalid) {
  return;
}

if(this.editclicked)
{
  this.service.updateUser(this.adduserForm.value)
  .pipe(first())
  .subscribe(
    data => {
      alert('User updated successfully.');
      window.location.reload();  
     },
    error => {
      alert(error);
    });
    this.submitted=false;
    this.adduserForm.reset();
}
else
{
  this.service.createUser(this.adduserForm.value)
  .subscribe(data => {
    alert('User Added successfully.');
    window.location.reload();  
  });
}
  
this.editclicked = false;
  
     
  }

  onReset() {
    this.submitted=false;
    this.editclicked = false;
    this.adduserForm.reset();
  }

  EditUser(user:User)
  {
    this.editclicked = true;
  
    this.service.getUserById(user.UserId)
    .subscribe(data => {
      this.adduserForm.setValue(data);
    });

  }

  deleteUser(user: User) {
    this.service.deleteUser(user.UserId).subscribe(data => {
      this.users = this.users.filter(u => u !== user);
    })

  }

  SortType(sort:string) {
  
if(sort==='FirstName')
{

  this.users = this.copyusers.sort(this.sortByFirstName);

}

if(sort==='LastName')
{

  this.users = this.copyusers.sort(this.sortByLastName);

}

if(sort==='EmployeeId')
{

  this.users = this.copyusers.sort(this.sortByEmployeeID);
  
}

  }
  sortByFirstName(user1:User,user2:User)
  {
  
    if(user1.FirstName > user2.FirstName) return 1
    else if (user1.FirstName === user2.FirstName) return 0
    else return -1;
  }

  sortByLastName(user1:User,user2:User)
  {
  
    if(user1.LastName > user2.LastName) return 1
    else if (user1.LastName === user2.LastName) return 0
    else return -1;
  }

  sortByEmployeeID(user1:User,user2:User)
  {
  
    if(user1.EmployeeId > user2.EmployeeId) return 1
    else if (user1.EmployeeId === user2.EmployeeId) return 0
    else return -1;
  }


}
