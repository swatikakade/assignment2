import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './list/list.component';
import { AddEditComponent } from './add-edit/add-edit.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { MylinksComponent } from './mylinks/mylinks.component';

const routes: Routes = [
    { path: '', component: ListComponent },
    { path: 'register', component: AddEditComponent },
    { path: 'login', component: LoginComponent },
    { path: 'edit/:id', component: AddEditComponent },
    { path: 'mylinks', component: MylinksComponent }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
