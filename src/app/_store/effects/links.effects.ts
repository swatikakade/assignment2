import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, switchMap, mergeMap, catchError, tap, concatMap } from "rxjs/operators";
import * as fromLinkActions from "../actions/links.actions";
import { of } from "rxjs";
import { LinkService } from "../../_services/link.service";
import { Router } from "@angular/router";

@Injectable()
export class LinkEffects {
  loadLinks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromLinkActions.loadLinks),
      mergeMap( () =>
        this.LinkService.getlinks().pipe(
          map(links => fromLinkActions.loadLinksSuccess({links})),
          catchError(error =>
            of(fromLinkActions.loadLinksFail({ error }))
          )
        )
      )
    )
  );

  loadLink$ = createEffect(() =>
  this.actions$.pipe(
    ofType(fromLinkActions.loadLink),
    mergeMap( (action) =>
      this.LinkService.getLink(action.id).pipe(
        map(link => fromLinkActions.loadLinkSuccess({ selectedLink: link })),
        catchError(error =>
          of(fromLinkActions.loadLinkFail({ error }))
        )
      )
    )
  )
);

  createLink$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromLinkActions.addLink),
      mergeMap(action =>
        this.LinkService.createLink(action.Link).pipe(
          map(Link => fromLinkActions.addLinkSuccess({ Link })),
          catchError(error =>
            of(fromLinkActions.addLinkFail({ error }))
          )
        )
      ),
      tap(() => this.router.navigate(["/links"]))
    )
  );

  updateLink$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromLinkActions.updateLink),
        concatMap(action =>
          this.LinkService.updateLink(
            action.Link.id,
            action.Link.changes
          )
        ),
        tap(() => this.router.navigate(["/links"]))
      ),
    { dispatch: false }
  );

  deleteLink$ = createEffect(() =>{
      return this.actions$.pipe(
        ofType(fromLinkActions.deleteLink),
        mergeMap(action =>{
        return  this.LinkService.deleteLink(action.id).pipe(
            map(() => fromLinkActions.deleteLinkSuccess({ id: action.id })),
            catchError(error =>
              of(fromLinkActions.deleteLinkFail({ error }))
            )
          )
            }
        )
    );
    { dispatch: this.loadLink$}
  });

  constructor(
    private actions$: Actions,
    private LinkService: LinkService,
    private router: Router
  ) {}
}