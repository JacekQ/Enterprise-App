import {
  LayoutActionTypes,
  LayoutActionsUnion,
} from '../actions/layout.actions';
import { ScreenSizeEnum } from '../enums';
import { Link } from '../models/link';

export interface State {
  showSidenav: boolean;
  language: string;
  routeTitleKey: string;
  screenSize: string;
  headerActions: Link[];
  scrollTop: number;
}

const initialState: State = {
  showSidenav: false,
  language: 'pl',
  routeTitleKey: 'menu.empty',
  screenSize: null,
  headerActions: null,
  scrollTop: 0
};

export function reducer(
  state: State = initialState,
  action: LayoutActionsUnion
): State {
  switch (action.type) {
    case LayoutActionTypes.CloseSidenav:
      return {
        ...state,
        showSidenav: false,
      };

    case LayoutActionTypes.OpenSidenav:
      return {
        ...state,
        showSidenav: true,
      };
    case LayoutActionTypes.ChangeLanguageSuccess:
      return {
        ...state,
        language: action.payload.language
      };

    case LayoutActionTypes.SetRouteTitleKey:
      return {
        ...state,
        routeTitleKey: action.payload.routeTitleKey
      };
    case LayoutActionTypes.SetHeaderLinks:
      return {
        ...state,
        headerActions: action.payload.headerActions
      };
    case LayoutActionTypes.SetScreenSize:
      return {
        ...state,
        screenSize: action.payload
      };
    case LayoutActionTypes.ScrollChange:
      return {
        ...state,
        scrollTop: action.payload
      };
    default:
      return state;
  }
}

export const getShowSidenav = (state: State) => state && state.showSidenav;
export const getLanguage = (state: State) => state && state.language;
export const getRouteTitleKey = (state: State) => state && state.routeTitleKey;
export const getHeaderActions = (state: State) => state && state.headerActions;
export const getScrollTop = (state: State) => state && state.scrollTop;
export const getScreenSize = (state: State) => state && state.screenSize;

export const getScreenIsXs = (state: State) => state && state.screenSize === ScreenSizeEnum.xs;
export const getScreenIsSm = (state: State) => state && state.screenSize === ScreenSizeEnum.sm;
export const getScreenIsMd = (state: State) => state && state.screenSize === ScreenSizeEnum.md;
export const getScreenIsLg = (state: State) => state && state.screenSize === ScreenSizeEnum.lg;
export const getScreenIsXl = (state: State) => state && state.screenSize === ScreenSizeEnum.xl;

export const getScreenIsMobile = (state: State) => getScreenIsXs(state);
export const getScreenIsTablet = (state: State) => getScreenIsSm(state) || getScreenIsMd(state);
export const getScreenIsDesktop = (state: State) => getScreenIsLg(state) || getScreenIsXl(state);
