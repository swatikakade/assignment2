import { createFeatureSelector, createSelector } from "@ngrx/store";
import { linksFeatureKey, LinkState, selectAll } from "../reducers/links.reducers";

export const selectLinkState = createFeatureSelector<LinkState>(
  linksFeatureKey
);

export const selectLinks = createSelector(selectLinkState, selectAll);
export const selectedLinks = createSelector(
  selectLinkState,
  (state: LinkState) => state.selectedLinks,
  
);
export const selectedLink = createSelector(
  selectLinkState,
  (state: LinkState) => state.selectedLink,
  
);
