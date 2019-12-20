import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';

import { AppRoutingModule  } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddComponent } from './UI/add/add.component';
import { ViewComponent } from './UI/view/view.component';
import { EditComponent } from './UI/edit/edit.component';

import { HttpClientModule} from '@angular/common/http';
import { SharedService } from 'src/app/Service/shared.service';


@NgModule({
  declarations: [
    AppComponent,
    AddComponent,
    ViewComponent,
    EditComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
 
  ],
  providers: [
    SharedService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
