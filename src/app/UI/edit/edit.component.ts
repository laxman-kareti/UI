import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/Service/shared.service'
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
Tasks$:object
  constructor(private data:SharedService,private route:ActivatedRoute) {
    this.route.params.subscribe(params => this.Tasks$ = params.id )
   }

  ngOnInit() {
    this.data.Get(this.Tasks$).subscribe(
      data => this.Tasks$ = data
    )
  }

}
