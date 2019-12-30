import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedService } from '../../Service/shared.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/empty';
import 'rxjs/add/observable/throw';
import { Task } from 'src/app/Model/task';
import { ViewComponent } from './view.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FilterPipe } from '../../pipe/filter.pipe';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';


describe('ViewComponent', () => {
  let component: ViewComponent;
  let fixture: ComponentFixture<ViewComponent>;
  // let service: SharedService;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      
      imports: [ReactiveFormsModule,FormsModule,RouterTestingModule],
      declarations: [ ViewComponent,FilterPipe ],
      providers: [{
      provide:SharedService,useClass:SharedServiceStub}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });
});


class SharedServiceStub {
  a:any[]
  getTasks():Observable<any> {
return of(this.a)
  }
}