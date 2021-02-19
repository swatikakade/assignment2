import { createFeatureSelector, createSelector } from "@ngrx/store";
import { usersFeatureKey, UserState, selectAll } from "../reducers/users.reducers";
import { AppState } from "../app.state";

export const selectUserState = createFeatureSelector<UserState>(
  usersFeatureKey
);

export const selectUsers = createSelector(selectUserState, selectAll);
export const selectedUsers = createSelector(
  selectUserState,
  (state: UserState) => state.selectedUsers,
  
);
export const selectedUser = createSelector(
  selectUserState,
  (state: UserState) => state.selectedUser,
);

const getAuthState = createFeatureSelector<AppState>('auth');
export const isAuthenticated = createSelector(getAuthState, (state) => {
  return state.user ? true : false;
});
