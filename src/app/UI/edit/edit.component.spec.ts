import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditComponent } from './edit.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { Ng5SliderModule } from 'ng5-slider';
import { SharedService } from '../../Service/shared.service';
import { Observable, of } from 'rxjs';
import { FilterPipe } from '../../pipe/filter.pipe';

describe('EditComponent', () => {
  let component: EditComponent;
  let fixture: ComponentFixture<EditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule,FormsModule,RouterTestingModule,Ng5SliderModule],
      declarations: [EditComponent, FilterPipe ],
      providers: [{
      provide:SharedService, useClass: SharedServiceStub}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

class SharedServiceStub {

  
  a:any[]
 
  getTaskById():Observable<any> {
   
   return of(this.a);
  }

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