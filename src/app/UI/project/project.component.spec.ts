import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedService } from '../../Service/shared.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/empty';
import 'rxjs/add/observable/throw';
import { User } from 'src/app/Model/User';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FilterPipe } from '../../pipe/filter.pipe';
import { RouterTestingModule } from '@angular/router/testing';
import { Ng5SliderModule } from 'ng5-slider';
import { of } from 'rxjs';
import { ProjectComponent } from './project.component';

describe('ProjectComponent', () => {
  let component: ProjectComponent;
  let fixture: ComponentFixture<ProjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule,FormsModule,RouterTestingModule,Ng5SliderModule],
      declarations: [ ProjectComponent,FilterPipe ],
      providers: [{
      provide:SharedService,useClass:SharedServiceStub}
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

class SharedServiceStub {
  a:any[]
  getProjects():Observable<any> {
   return of(this.a)
  }

  getUsers():Observable<any> {
    return of(this.a)
   }
}
