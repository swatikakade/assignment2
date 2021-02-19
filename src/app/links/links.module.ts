import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {StoreModule, ActionReducerMap} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {LinkEffects} from '../_store/effects/links.effects';
import * as linkReducer from '../_store/reducers/links.reducers';

import { ListComponent } from './list/list.component';
import { AddEditComponent } from './add-edit/add-edit.component';
import { LinksRoutingModule } from './links-routing.module';
import { HttpClientModule } from '@angular/common/http';

export const reducers: ActionReducerMap<any> = {
  links: linkReducer.reducer
};

@NgModule({
  declarations: [AddEditComponent, ListComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    LinksRoutingModule,
    HttpClientModule,
    StoreModule.forFeature(linkReducer.linksFeatureKey, linkReducer.reducer),
    EffectsModule.forFeature([LinkEffects]),
  ]
})
export class LinksModule { }
