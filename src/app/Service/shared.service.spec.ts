import { TestBed,inject } from '@angular/core/testing';
import { SharedService } from './shared.service';
import { HttpClientTestingModule,HttpTestingController } from '@angular/common/http/testing';
import { Task } from '../Model/task';



describe('SharedService', () => {

  let service : SharedService;
  let httpMock: HttpTestingController;
  let taskid=7049;

  const dummytasks: Task[] = [

    {

      TaskId: 1,

      TaskName: 't1',

      Priority: 1,

      StartDate: new Date(2019,12,29),

      EndDate:null,
      ParentTask: null,
      ParentId  :null

    },

    {

      TaskId: 2,

      TaskName: 't2',

      Priority: 2,

      StartDate: new Date(2019,12,29),

      EndDate:null,
      ParentTask: null,
      ParentId  :null

    },

    {

      TaskId: 3,

      TaskName: 't3',

      Priority: 3,

      StartDate: new Date(2019,12,29),

      EndDate:null,
      ParentTask: null,
      ParentId  :null

    }

  ];
  beforeEach(() => {
   TestBed.configureTestingModule({
     imports: [HttpClientTestingModule],
     providers: [SharedService]
   });

   service = TestBed.get(SharedService);
   httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(()  => {
  httpMock.verify();
  });

  it('should retrieve tasks from API via Get', () => {
    

    service.getTasks().subscribe( tasks=> {

    expect(tasks.length).toBe(3);
    expect(tasks).toEqual(dummytasks);
    });

  const request = httpMock.expectOne(`${service.url}GetAllTasks`);

  expect(request.request.method).toBe('GET');

  request.flush(dummytasks);

  });

  
});

