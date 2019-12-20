import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/Service/shared.service'
import {Observable } from 'rxjs';
import { Task } from '../../Model/task';



@Component({
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  Tasks: Task[];
  constructor(private data:SharedService) { 

  }

  ngOnInit() {
this.data.GetAll().subscribe(
  data => this.Tasks = data
)
  }

}
