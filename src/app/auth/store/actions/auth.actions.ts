import { Action } from '@ngrx/store';
import { User, Authenticate, UserRole } from '../../models/user';

export enum AuthActionTypes {
  HomeRedirect = '[Auth] Home Redirect',
  Login = '[Auth] Login',
  LoginSuccess = '[Auth] Login Success',
  LoginFailure = '[Auth] Login Failure',
  LoginRedirect = '[Auth] Login Redirect',
  GetUser = '[Auth] Get User',
  GetUserSuccess = '[Auth] Get User Success',
  Logout = '[Auth] Logout',
  ReloadPage = '[Auth] Reload page'
}

export class HomeRedirect implements Action {
  readonly type = AuthActionTypes.HomeRedirect;

  constructor(public payload: { userRoles: UserRole[] }) { }
}

export class Login implements Action {
  readonly type = AuthActionTypes.Login;

  constructor(public payload: Authenticate) { }
}

export class GetUser implements Action {
  readonly type = AuthActionTypes.GetUser;

  constructor(public payload: number) { }
}

export class GetUserSuccess implements Action {
  readonly type = AuthActionTypes.GetUserSuccess;

  constructor(public payload: User ) { }
}

export class LoginSuccess implements Action {
  readonly type = AuthActionTypes.LoginSuccess;

  constructor(public payload: User ) { }
}

export class LoginFailure implements Action {
  readonly type = AuthActionTypes.LoginFailure;

  constructor(public payload: any) { }
}

export class LoginRedirect implements Action {
  readonly type = AuthActionTypes.LoginRedirect;
}

export class Logout implements Action {
  readonly type = AuthActionTypes.Logout;
}

export class ReloadPage implements Action {
  readonly type = AuthActionTypes.ReloadPage;
}

export type AuthActionsUnion =
  | HomeRedirect
  | Login
  | LoginSuccess
  | LoginFailure
  | LoginRedirect
  | Logout
  | GetUser
  | GetUserSuccess
  | ReloadPage;
