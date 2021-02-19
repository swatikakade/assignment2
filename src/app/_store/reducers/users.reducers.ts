import { Action, createReducer, on } from "@ngrx/store";
import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";
import { User } from "../../_models/user";
import * as fromUserActions from "../actions/users.actions";
export const usersFeatureKey = "users";

export interface UserState extends EntityState<User> {
  // additional entities state properties
  error: '';
  selectedUsers: User[];
  selectedUser: User;
}

export const adapter: EntityAdapter<User> = createEntityAdapter<User>();

export const initialState: UserState = adapter.getInitialState({
  // additional entity state properties
  error: undefined,
  selectedUsers: undefined,
  selectedUser: undefined,
  selectedUserId: undefined
});

const userReducer = createReducer(
  initialState,
  on(fromUserActions.addUserSuccess, (state, action) =>
    adapter.addOne(action.User, state)
  ),
  on(fromUserActions.addUserFail, (state, action) => {
    return {
      ...state,
      error: action.error
    };
  }),
  on(fromUserActions.loadUsersSuccess, (state, action) =>{
    return{
      ...state,
      selectedUsers: action.users
    }
  }
  ),
  on(fromUserActions.loadUsersFail, (state, action) => {
    return {
      ...state,
      error: action.error
    };
  }),
  on(fromUserActions.loadUserSuccess, (state, action) => {
    return {
      ...state,
      selectedUser: action.selectedUser
    };
  }),
  on(fromUserActions.loadUserFail, (state, action) => {
    return {
      ...state,
      error: action.error
    };
  }),
  on(fromUserActions.updateUser, (state, action) =>
    adapter.updateOne(action.User, state)
  ),
  on(fromUserActions.deleteUserSuccess, (state, action) =>{
    return adapter.removeOne(action.id, state)
  }),
  on(fromUserActions.deleteUserFail, (state, action) => {
    return {
      ...state,
      error: action.error
    };
  }),
  on(fromUserActions.loginSuccess, (state, action) => {
    return {
      ...state,
      user: action.user,
    };
  }),
  on(fromUserActions.logout, (state) => {
    return {
      ...state,
      user: null,
    };
  })
);

export function reducer(state: UserState | undefined, action: Action) {
  return userReducer(state, action);
}

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal
} = adapter.getSelectors();
