import {
    ActionReducerMap,
    createSelector,
    createFeatureSelector,
    ActionReducer,
    MetaReducer,
} from '@ngrx/store';
import * as fromRouter from '@ngrx/router-store';

import { environment } from '../../environments/environment';
import { RouterStateUrl } from '../shared/utils';

/**
 * storeFreeze prevents state from being mutated. When mutation occurs, an
 * exception will be thrown. This is useful during development mode to
 * ensure that none of the reducers accidentally mutates the state.
 */
// import { storeFreeze } from 'ngrx-store-freeze';

/**
 * Every reducer module's default export is the reducer function itself. In
 * addition, each module should export a type or interface that describes
 * the state of the reducer plus any selector functions. The `* as`
 * notation packages up all of the exports into a single object.
 */

import * as fromLayout from '../core/reducers/layout.reducer';

/**
 * As mentioned, we treat each reducer like a table in a database. This means
 * our top level state interface is just a map of keys to inner state types.
 */
export interface State {
    layout: fromLayout.State;
    router: fromRouter.RouterReducerState<RouterStateUrl>;
}

/**
 * Our state is composed of a map of action reducer functions.
 * These reducer functions are called with each dispatched action
 * and the current or initial state and return a new immutable state.
 */
export const reducers: ActionReducerMap<State> = {
    layout: fromLayout.reducer,
    router: fromRouter.routerReducer,
};

// console.log all actions
export function logger(reducer: ActionReducer<State>): ActionReducer<State> {
    return function (state: State, action: any): State {
        console.log('state', state);
        console.log('action', action);

        return reducer(state, action);
    };
}

/**
 * By default, @ngrx/store uses combineReducers with the reducer map to compose
 * the root meta-reducer. To add more meta-reducers, provide an array of meta-reducers
 * that will be composed to form the root meta-reducer.
 */
export const metaReducers: MetaReducer<State>[] = !environment.production
    ? [
        logger,
        // storeFreeze
    ]
    : [];

/**
 * Layout Reducers
 */
export const getLayoutState = createFeatureSelector<fromLayout.State>('layout');

export const getShowSidenav = createSelector(
    getLayoutState,
    fromLayout.getShowSidenav
);

export const getLanguage = createSelector(
    getLayoutState,
    fromLayout.getLanguage
);

export const getRouteTitleKey = createSelector(
    getLayoutState,
    fromLayout.getRouteTitleKey
);

export const getHeaderActions = createSelector(
    getLayoutState,
    fromLayout.getHeaderActions
);
export const getScrollTop = createSelector(
    getLayoutState,
    fromLayout.getScrollTop
);

export const getScreenSize = createSelector(
    getLayoutState,
    fromLayout.getScreenSize
);

export const getScreenIsXs = createSelector(
    getLayoutState,
    fromLayout.getScreenIsXs
);

export const getScreenIsSm = createSelector(
    getLayoutState,
    fromLayout.getScreenIsSm
);

export const getScreenIsMd = createSelector(
    getLayoutState,
    fromLayout.getScreenIsMd
);

export const getScreenIsLg = createSelector(
    getLayoutState,
    fromLayout.getScreenIsLg
);

export const getScreenIsXl = createSelector(
    getLayoutState,
    fromLayout.getScreenIsXl
);

export const getScreenIsMobile = createSelector(
    getLayoutState,
    fromLayout.getScreenIsMobile
);

export const getScreenIsTablet = createSelector(
    getLayoutState,
    fromLayout.getScreenIsTablet
);

export const getScreenIsDesktop = createSelector(
    getLayoutState,
    fromLayout.getScreenIsDesktop
);

