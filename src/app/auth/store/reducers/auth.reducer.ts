import { UserRoles } from '../../enums';
import { User } from '../../models/user';
import { AuthActionsUnion, AuthActionTypes } from './../actions/auth.actions';

export interface State {
  loggedIn: boolean;
  user: User | null;
  error: any | null;
  userRoles: string[];
  userPermissions: string[];
}

export const initialState: State = {
  loggedIn: false,
  user: null,
  error: null,
  userRoles: [],
  userPermissions: []
};

export function reducer(state = initialState, action: AuthActionsUnion): State {
  switch (action.type) {
    case AuthActionTypes.GetUserSuccess:
    case AuthActionTypes.LoginSuccess:
      const user: User = action.payload;
      const userRoles = [];
      const userPermissions = [];
      if (user.role) {
        user.role.forEach(uRole => {
          userRoles.push(uRole.name);
          if (uRole.userPermissions) {
            userPermissions.push(...uRole.userPermissions.map(uPerm => uPerm.name));
          }
        });
      }

      return {
        ...state,
        loggedIn: true,
        user: user,
        userRoles,
        userPermissions,
        error: null
      };

    case AuthActionTypes.LoginFailure:
      return {
        ...state,
        loggedIn: false,
        error: action.payload.error.message
      };

    case AuthActionTypes.Logout:
      return {
        loggedIn: false,
        user: null,
        error: null,
        userRoles: [],
        userPermissions: []
      };

    default:
      return state;
  }
}

export const getLoggedIn = (state: State) => state.loggedIn;
export const getUser = (state: State) => state.user;
export const getIsAdmin = (state: State) => state.userRoles.indexOf(UserRoles.ROLE_ADMIN) > -1;
export const getError = (state: State) => state.error;
export const getAuthStatus = (state: State) => state;
