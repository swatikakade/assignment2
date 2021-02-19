import { Action, createReducer, on } from "@ngrx/store";
import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";
import { Link } from "../../_models/link";
import * as fromLinkActions from "../actions/links.actions";

export const linksFeatureKey = "links";

export interface LinkState extends EntityState<Link> {
  // additional entities state properties
  error: '';
  selectedLinks: Link[];
  selectedLink: Link;
}

export const adapter: EntityAdapter<Link> = createEntityAdapter<Link>();

export const initialState: LinkState = adapter.getInitialState({
  // additional entity state properties
  error: undefined,
  selectedLinks: undefined,
  selectedLink: undefined,
  selectedLinkId: undefined
});

const linkReducer = createReducer(
  initialState,
  on(fromLinkActions.addLinkSuccess, (state, action) =>
    adapter.addOne(action.Link, state)
  ),
  on(fromLinkActions.addLinkFail, (state, action) => {
    return {
      ...state,
      error: action.error
    };
  }),
  on(fromLinkActions.loadLinksSuccess, (state, action) =>{
    return{
      ...state,
      selectedLinks: action.links
    }
  }
  ),
  on(fromLinkActions.loadLinksFail, (state, action) => {
    return {
      ...state,
      error: action.error
    };
  }),
  on(fromLinkActions.loadLinkSuccess, (state, action) => {
    return {
      ...state,
      selectedLink: action.selectedLink
    };
  }),
  on(fromLinkActions.loadLinkFail, (state, action) => {
    return {
      ...state,
      error: action.error
    };
  }),
  on(fromLinkActions.updateLink, (state, action) =>
    adapter.updateOne(action.Link, state)
  ),
  on(fromLinkActions.deleteLinkSuccess, (state, action) =>{
    return adapter.removeOne(action.id, state)
  }),
  on(fromLinkActions.deleteLinkFail, (state, action) => {
    return {
      ...state,
      error: action.error
    };
  })
);

export function reducer(state: LinkState | undefined, action: Action) {
  return linkReducer(state, action);
}

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal
} = adapter.getSelectors();
