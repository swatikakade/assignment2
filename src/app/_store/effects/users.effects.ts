import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, switchMap, mergeMap, catchError, tap, concatMap, exhaustMap, flatMap } from "rxjs/operators";
import * as fromUserActions from "../actions/users.actions";
import { Store } from '@ngrx/store';
import { of } from "rxjs";
import { UserService } from "../../_services/user.service";
import { Router } from "@angular/router";
import { AppState } from "../app.state";

@Injectable()
export class UserEffects {

  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromUserActions.loadUsers),
      mergeMap( () =>
        this.UserService.getUsers().pipe(
          map(users => fromUserActions.loadUsersSuccess({users})),
          catchError(error =>
            of(fromUserActions.loadUserFail({ error }))
          )
        )
      )
    )
  );

  loadUser$ = createEffect(() =>
  this.actions$.pipe(
    ofType(fromUserActions.loadUser),
    mergeMap( (action) =>
      this.UserService.getUser(action.id).pipe(
        map(user => fromUserActions.loadUserSuccess({ selectedUser: user })),
        catchError(error =>
          of(fromUserActions.loadUserFail({ error }))
          )
        )
      )
    )
  );

  createUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromUserActions.addUser),
      mergeMap(action =>
        this.UserService.createUser(action.User).pipe(
          map(User => fromUserActions.addUserSuccess({ User })),
          catchError(error =>
            of(fromUserActions.addUserFail({ error }))
          )
        )
      ),
      tap(() => this.router.navigate(["/users"]))
    )
  );

  updateUser$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromUserActions.updateUser),
        concatMap(action =>
          this.UserService.updateUser(
            action.User.id,
            action.User.changes
          )
        ),
        tap(() => this.router.navigate(["/users"]))
      ),
    { dispatch: false }
  );

  deleteUser$ = createEffect(() =>{
      return this.actions$.pipe(
        ofType(fromUserActions.deleteUser),
        mergeMap(action =>{
        return  this.UserService.deleteUser(action.id).pipe(
            map(() => fromUserActions.deleteUserSuccess({ id: action.id })),
            catchError(error =>
              of(fromUserActions.deleteUserFail({ error }))
            )
          )
            }
        )
    );
    { dispatch: this.loadUser$}
  });

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromUserActions.login),
      exhaustMap((action) => {
        // return this.UserService.login(action.email, action.password).pipe(
        //   map((data) => {
        //     console.log(data);
        //     const user = this.UserService.getUserByEmail(action.email);
        //     this.store.dispatch(fromUserActions.setErrorMessage({ message: '' }));
        //     // const user = res; //this.authService.formatUser(res);



        //     // const res = data[0];
        //     // const user = res; //this.authService.formatUser(res);
        //     // //this.authService.setUserInLocalStorage(user);
        //     // localStorage.setItem('userData', JSON.stringify(user));
        //     // return fromUserActions.loginSuccess({ user, redirect: true });
        //   }),
        //   catchError((error) => {
        //     const errorMessage = error;
        //     return of(fromUserActions.setErrorMessage({ message: errorMessage }));
        //   })
        // );
        return this.UserService.login(action.email, action.password).pipe(
          tap((res) => { var tokenData = res; }),
          flatMap(u => this.UserService.getUserByEmail(action.email))
        ).pipe(
          map((data) => {
            const user = data[0];
            console.log(user);
            sessionStorage.setItem('currentUser', JSON.stringify(user));
            return fromUserActions.loginSuccess({ user, redirect: true });
          }),
          catchError((error) => {
            const errorMessage = error;
            return of(fromUserActions.setErrorMessage({ message: errorMessage }));
          })
        );
      })
    );
  });

  loginRedirect$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(...[fromUserActions.loginSuccess]),
        tap((action) => {
          this.store.dispatch(fromUserActions.setErrorMessage({ message: '' }));
          if (action.redirect) {
            this.router.navigate(['/']);
          }
        })
      );
    },
    { dispatch: false }
  );

  // autoLogin$ = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType(autoLogin),
  //     mergeMap((action) => {
  //       const user = this.authService.getUserFromLocalStorage();
  //       return of(loginSuccess({ user, redirect: false }));
  //     })
  //   );
  // });

  logout$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(fromUserActions.logout),
        map((action) => {
          alert(8);
          console.log(action);
          this.UserService.logout();
          this.router.navigate(['/']);
        })
      );
    },
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private UserService: UserService,
    private router: Router,
    private store: Store<AppState>,
  ) {}
}