import { Action } from '@ngrx/store';
import { ScreenSizeEnum } from '../enums';
import { Link } from '../models/link';

export enum LayoutActionTypes {
  OpenSidenav = '[Layout] Open Sidenav',
  CloseSidenav = '[Layout] Close Sidenav',
  ChangeLanguage = '[Layout] Change Language',
  ChangeLanguageSuccess = '[Layout] Change Language Success',
  ChangeLanguageFailure = '[Layout] Change Language Failure',
  SetRouteTitleKey = '[Layout] Set Route Title Key',
  SetHeaderLinks = '[Layout] Set Header Action Links',
  SetScreenSize = '[Layout] Set Screen Size',
  ScrollChange = '[Layout] Scroll Change'
}

export class OpenSidenav implements Action {
  readonly type = LayoutActionTypes.OpenSidenav;
}

export class CloseSidenav implements Action {
  readonly type = LayoutActionTypes.CloseSidenav;
}

export class ChangeLanguage implements Action {
  readonly type = LayoutActionTypes.ChangeLanguage;

  constructor(public payload: { language: string }) { }
}

export class ChangeLanguageSuccess implements Action {
  readonly type = LayoutActionTypes.ChangeLanguageSuccess;

  constructor(public payload: { language: string }) { }
}

export class ChangeLanguageFailure implements Action {
  readonly type = LayoutActionTypes.ChangeLanguageFailure;

  constructor(public payload: any) { }
}

export class SetRouteTitleKey implements Action {
  readonly type = LayoutActionTypes.SetRouteTitleKey;

  constructor(public payload: { routeTitleKey: string }) { }
}

export class SetHeaderLinks implements Action {
  readonly type = LayoutActionTypes.SetHeaderLinks;

  constructor(public payload: { headerActions: Link[] }) { }
}

export class SetScreenSize implements Action {
  readonly type = LayoutActionTypes.SetScreenSize;

  constructor(public payload: ScreenSizeEnum) {
  }
}

export class ScrollChange implements Action {
  readonly type = LayoutActionTypes.ScrollChange;

  constructor(public payload: number) {
  }
}

export type LayoutActionsUnion =
  OpenSidenav |
  CloseSidenav |
  ChangeLanguage |
  ChangeLanguageFailure |
  ChangeLanguageSuccess |
  SetRouteTitleKey |
  SetHeaderLinks |
  SetScreenSize |
  ScrollChange;
