import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListComponent } from './links/list/list.component';

const usersModule = () => import('./users/users.module').then(x => x.UsersModule);
const linksModule = () => import('./links/links.module').then(x => x.LinksModule);

const routes: Routes = [
  { path: '', component: ListComponent },
  { path: 'users', loadChildren: usersModule },
  { path: 'links', loadChildren: linksModule }
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
