import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import { User } from '../_models/user';

export interface AppState {
  router: RouterReducerState;
  user: User | null;
}

export const appReducer = {
  router: routerReducer,
};
