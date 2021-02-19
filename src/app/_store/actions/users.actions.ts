import { createAction, props } from "@ngrx/store";
import { Update } from "@ngrx/entity";
import { User } from '../../_models/user';

// Load List Users
export const loadUsers = createAction(
  "[User List Component] Load Users",
);
export const loadUsersSuccess = createAction(
  "[User List Effect] Load Users Success",
  props<{ users: User[] }>()
);
export const loadUsersFail = createAction(
  "[User List Effect] Load Users Failure",
  props<{ error: any }>()
);

// Load User
export const loadUser = createAction(
  "[User Components] Load User",
  props<{ id: string }>()
);
export const loadUserSuccess = createAction(
  "[User Effect] Load User Success",
  props<{ selectedUser: User }>()
);
export const loadUserFail = createAction(
  "[User Effect] Load User Failure",
  props<{ error: any }>()
);

// Add User
export const addUser = createAction(
  "[User Add Component] Add User",
  props<{ User: User }>()
);

export const addUserSuccess = createAction(
  "[User Add Effect] Add User Success",
  props<{ User: User }>()
);

export const addUserFail = createAction(
  "[User Add Effect] Add User Failure",
  props<{ error: any }>()
);

// Update User
export const updateUser = createAction(
  "[User Edit Component] Update User",
  props<{ User: Update<User> }>()
);

// Delete User
export const deleteUser = createAction(
  "[User Components] Delete User",
  props<{ id: string }>()
);

export const deleteUserSuccess = createAction(
  "[User Delete Effect] Delete User Success",
  props<{ id: string }>()
);

export const deleteUserFail = createAction(
  "[User Delete Effect] Delete User Failure",
  props<{ error: any }>()
);

// Login User
export const login = createAction(
  "[Login login effect] Login",
  props<{ email: string; password: string }>()
);
export const loginSuccess = createAction(
  "[Login Components] Login Success",
  props<{ user: User; redirect: boolean }>()
);
export const loginFail = createAction(
  "[Login Components] Login Fail",
  props<{ error: any }>()
);
export const logout = createAction(
  "[Login Component] Logout"
);

export const setErrorMessage = createAction(
  "[Login Components] Error Message",
  props<{ message: string }>()
);

// export const autoLogin = createAction("[Login Components] Auto Login");
// export const dummyAction = createAction('[dummy action]');