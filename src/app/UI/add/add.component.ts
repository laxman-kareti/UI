import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as $ from 'jquery';
import { range } from 'rxjs';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  

  constructor() { }

  ngOnInit() {

    $(document).ready(function(){
    $("#Slider").slider({
      range:false,
      min:0,
      max:30
    })
  });
  }

  

saveTask(employeeForm: NgForm): void {
  console.log(employeeForm.value);
}


}
