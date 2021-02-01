import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { LinksRoutingModule } from './links-routing.module';
import { AddEditComponent } from './add-edit/add-edit.component';
import { ListComponent } from './list/list.component';


@NgModule({
  declarations: [AddEditComponent, ListComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LinksRoutingModule
  ]
})
export class LinksModule { }
