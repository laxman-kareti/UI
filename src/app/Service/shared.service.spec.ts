import { TestBed,inject } from '@angular/core/testing';
import { SharedService } from './shared.service';
import { HttpClientTestingModule,HttpTestingController } from '@angular/common/http/testing';
import { Task } from '../Model/task';
import { User } from '../Model/User';
import { Project } from '../Model/Project';



describe('SharedService', () => {

  let service : SharedService;
  let httpMock: HttpTestingController;
  let projectid=8;

  const dummytasks: Task[] = [

    {

      TaskId: 1,

      TaskName: 't1',

      Priority: 1,

      StartDate: new Date(2019,12,29),

      EndDate:null,
      ParentTask: null,
      ParentId  :null,
      UserId:1,
      Status:'Completed'

    },

    {

      TaskId: 2,

      TaskName: 't2',

      Priority: 2,

      StartDate: new Date(2019,12,29),

      EndDate:null,
      ParentTask: null,
      ParentId  :null,
      UserId:1,
      Status:'Completed'

    },

    {

      TaskId: 3,

      TaskName: 't3',

      Priority: 3,

      StartDate: new Date(2019,12,29),

      EndDate:null,
      ParentTask: null,
      ParentId  :null,
      UserId:3,
      Status:'InProgress'

    }

  ];

  const dummyusers: User[] = [
{
UserId:1 ,
FirstName:'laxman',
LastName:'kareti',
EmployeeId:1001
},
{
UserId:2 ,
FirstName:'Praveen',
LastName:'kumar',
EmployeeId:1002
},
{
  UserId:3 ,
  FirstName:'Vishnu',
  LastName:'Prasad',
  EmployeeId:1003
}
];

const dummyprojects : Project[] = [
{
  ProjectId:1,
  ProjectName:'P1',
  StartDate: new Date(2019,12,29),
  EndDate:  new Date(2019,12,30),
  Priority:6,
  CompletedTasks:0,
  TotalTasks:1,
  UserId:1
},
{
  ProjectId:2,
  ProjectName:'P2',
  StartDate: new Date(2019,12,29),
  EndDate:  new Date(2019,12,30),
  Priority:6,
  CompletedTasks:0,
  TotalTasks:1,
  UserId:1
},
{
  ProjectId:3,
  ProjectName:'P3',
  StartDate: new Date(2019,12,29),
  EndDate:  new Date(2019,12,30),
  Priority:6,
  CompletedTasks:0,
  TotalTasks:1,
  UserId:1
}

]
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
    
   
    service.getTasks(projectid).subscribe( tasks=> {

    expect(tasks.length).toBe(3);
    expect(tasks).toEqual(dummytasks);
    });

  const request = httpMock.expectOne(`${service.url}task/GetAllTasks/`+projectid);

  expect(request.request.method).toBe('GET');

  request.flush(dummytasks);

  });

  it('should retrieve Users from API via Get', () => {
    
   
    service.getUsers().subscribe( users=> {

    expect(users.length).toBe(3);
    expect(users).toEqual(dummyusers);
    });

  const request1 = httpMock.expectOne(`${service.url}User/GetAllUsers`);

  expect(request1.request.method).toBe('GET');

  request1.flush(dummyusers);

  });

  
  it('should retrieve Projects from API via Get', () => {
    
   
    service.getProjects().subscribe( projects=> {

    expect(projects.length).toBe(3);
    expect(projects).toEqual(dummyprojects);
    });

  const request1 = httpMock.expectOne(`${service.url}Project/GetAllProjects`);

  expect(request1.request.method).toBe('GET');

  request1.flush(dummyprojects);

  });


  
});

