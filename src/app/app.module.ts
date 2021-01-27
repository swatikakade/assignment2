import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponentComponent } from './home-component/home-component.component';
import { UserComponentComponent } from './user-component/user-component.component';
import { AppRoutingModule } from './app-routing.module';
import { SharedComponentComponent } from './shared-component/shared-component.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponentComponent,
    UserComponentComponent,
    SharedComponentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
