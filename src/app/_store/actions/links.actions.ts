import { createAction, props } from "@ngrx/store";
import { Update } from "@ngrx/entity";
import { Link } from '../../_models/link';

// Load List Links
export const loadLinks = createAction(
  "[Link List Component] Load Links",
);
export const loadLinksSuccess = createAction(
  "[Link List Effect] Load Links Success",
  props<{ links: Link[] }>()
);
export const loadLinksFail = createAction(
  "[Link List Effect] Load Links Failure",
  props<{ error: any }>()
);
// Load Link
export const loadLink = createAction(
  "[Link Components] Load Link",
  props<{ id: string }>()
);
export const loadLinkSuccess = createAction(
  "[Link Effect] Load Link Success",
  props<{ selectedLink: Link }>()
);
export const loadLinkFail = createAction(
  "[Link Effect] Load Link Failure",
  props<{ error: any }>()
);
// Add Link
export const addLink = createAction(
  "[Link Add Component] Add Link",
  props<{ Link: Link }>()
);

export const addLinkSuccess = createAction(
  "[Link Add Effect] Add Link Success",
  props<{ Link: Link }>()
);

export const addLinkFail = createAction(
  "[Link Add Effect] Add Link Failure",
  props<{ error: any }>()
);

// Edit Component
export const updateLink = createAction(
  "[Link Edit Component] Update Link",
  props<{ Link: Update<Link> }>()
);
//Delete Link

export const deleteLink = createAction(
  "[Link Components] Delete Link",
  props<{ id: string }>()
);

export const deleteLinkSuccess = createAction(
  "[Link Delete Effect] Delete Link Success",
  props<{ id: string }>()
);

export const deleteLinkFail = createAction(
  "[Link Delete Effect] Delete Link Failure",
  props<{ error: any }>()
);