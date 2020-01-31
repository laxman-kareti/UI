import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedService } from '../../Service/shared.service';
import { AddComponent } from './add.component';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/empty';
import 'rxjs/add/observable/throw';
import { Task } from 'src/app/Model/task';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { FilterPipe } from '../../pipe/filter.pipe';
import { Ng5SliderModule } from 'ng5-slider';
import { of } from 'rxjs/internal/observable/of';



describe('AddComponent', () => {
  let component: AddComponent;
  let fixture: ComponentFixture<AddComponent>;
  let service: SharedService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule,FormsModule,RouterTestingModule,Ng5SliderModule],
      declarations: [AddComponent, FilterPipe ],
      providers: [{
      provide:SharedService, useClass:SharedServiceStub}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
   
    
   
  });

  

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

class SharedServiceStub {

  
  a:any[]
 
  GetParentTasks():Observable<any> {
   
   return of(this.a);
  }
  
  getUsers():Observable<any> {
   
    return of(this.a);
   }
   getProjects():Observable<any> {
   
    return of(this.a);
   }

}