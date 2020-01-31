import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedService } from '../../Service/shared.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/empty';
import 'rxjs/add/observable/throw';
import { User } from 'src/app/Model/User';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FilterPipe } from '../../pipe/filter.pipe';
import { UserFilterPipe } from '../../pipe/userfilter.pipe';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { UserComponent } from './user.component';

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
     
      imports: [ReactiveFormsModule,FormsModule,RouterTestingModule],
      declarations: [ UserComponent,UserFilterPipe ],
      providers: [{
      provide:SharedService,useClass:SharedServiceStub}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  
});

class SharedServiceStub {
  a:any[]
  getUsers():Observable<any> {
   return of(this.a)
  }

  getUsersById(id: number):Observable<any> {
    return of(this.a)
}

createUser(user:User):Observable<any> {
  return of(this.a)
}

updateUser(user:User):Observable<any> {
  return of(this.a)
}

deleteUser(id: number):Observable<any> {
  return of(this.a)
}

}
