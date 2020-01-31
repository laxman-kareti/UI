import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import { Ng5SliderModule } from 'ng5-slider';
import { AppRoutingModule  } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddComponent } from './UI/add/add.component';
import { ViewComponent } from './UI/view/view.component';
import { EditComponent } from './UI/edit/edit.component';
import { FilterPipe } from './pipe/filter.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule} from '@angular/common/http';
import { SharedService } from 'src/app/Service/shared.service';
import {DatePipe} from '@angular/common';
import {FormsModule} from '@angular/forms';
import { UserComponent } from './UI/user/user.component';
import { ProjectComponent } from './UI/project/project.component';
import { UserFilterPipe } from './pipe/userfilter.pipe';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';





@NgModule({
  declarations: [
    AppComponent,
    AddComponent,
    ViewComponent,
    EditComponent,
     FilterPipe,
     UserFilterPipe,
     UserComponent,
     ProjectComponent,
    
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    Ng5SliderModule,
    FormsModule,
    BrowserAnimationsModule,
    NgbModule
   
 
  
 
  ],
  providers: [
    SharedService,
    DatePipe,

   
  ],
  bootstrap: [AppComponent],

  
})
export class AppModule { }
