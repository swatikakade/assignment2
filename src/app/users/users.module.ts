import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule, ActionReducerMap } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from './../_store/effects/users.effects';
import * as userReducer from '../_store/reducers/users.reducers';

import { UsersRoutingModule } from './users-routing.module';
import { AddEditComponent } from './add-edit/add-edit.component';
import { ListComponent } from './list/list.component';
import { LoginComponent } from './login/login.component';
import { MylinksComponent } from './mylinks/mylinks.component';
import { HttpClientModule } from '@angular/common/http';

export const reducers: ActionReducerMap<any> = {
  links: userReducer.reducer
};

@NgModule({
  declarations: [AddEditComponent, ListComponent, LoginComponent, MylinksComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UsersRoutingModule,
    HttpClientModule,
    StoreModule.forFeature(userReducer.usersFeatureKey, userReducer.reducer),
    EffectsModule.forFeature([UserEffects]),
  ]
})
export class UsersModule { }
