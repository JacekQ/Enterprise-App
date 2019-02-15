import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Actions } from '@ngrx/effects';
import { cold, hot } from 'jasmine-marbles';

import { TestActions, getActions } from '../../../../tests';

import {
  Logout,
  HomeRedirect,
  // LogoutSuccess,
  // LogoutFailure,
  GetUser,
  // GetUserDataSuccess,
  // GetUserDataFailure,
  ReloadPage,
} from '../actions/auth.actions';
import { User } from '../../models/user';
import { AuthenticationService } from '../../services/authentication.service';
import { AuthEffects } from './auth.effects';
import { UserRoles } from '../../enums';

describe('AuthEffects', () => {
  let effects: AuthEffects;
  let authService: any;
  let actions$: TestActions;
  let routerService: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthEffects,
        {
          provide: AuthenticationService,
          useValue: { login: () => { } },
        },
        {
          provide: Actions,
          useFactory: getActions,
        },
        {
          provide: Router,
          useValue: { navigate: () => { } },
        },
      ],
    });

    effects = TestBed.get(AuthEffects);
    authService = TestBed.get(AuthenticationService);
    actions$ = TestBed.get(Actions);
    routerService = TestBed.get(Router);

    spyOn(routerService, 'navigate').and.callThrough();
  });

  xdescribe('GetUser$', () => {
    // it('should return an auth.GetUserDataSuccess action if GetUser succeeds', () => {
    //   const action = new GetUser();
    //   const user = { username: 'jane doe', userRoles: [{ name: UserRoles.ROLE_USER }] } as User;
    //   const completion = new GetUserDataSuccess({ user });

    //   actions$.stream = hot('-a---', { a: action });
    //   const response = cold('-a|', { a: user });
    //   const expected = cold('--b', { b: completion });
    //   authService.getUser = jasmine.createSpy().and.callFake(() => response);

    //   expect(effects.GetUser$).toBeObservable(expected);
    // });

    // it('should return an auth.GetUserDataFailure action if getUserData service throws', () => {
    //   const action = new GetUserData();
    //   const error = 'Server error';
    //   const completion = new GetUserDataFailure(error);

    //   actions$.stream = hot('-a---', { a: action });
    //   const response = cold('-#|', {}, error);
    //   const expected = cold('--b', { b: completion });
    //   authService.getUser = jasmine.createSpy().and.callFake(() => response);

    //   expect(effects.getUserData$).toBeObservable(expected);
    // });
  });

    it('should dispatch a RouterNavigation action when auth.HomeRedirect is dispatched with ROLE_USER', () => {
      const action = new HomeRedirect({ userRoles: [{ name: UserRoles.ROLE_USER, userPermissions: [] }] });

      actions$.stream = hot('-a---', { a: action });

      effects.homeRedirect$.subscribe(() => {
        expect(routerService.navigate).toHaveBeenCalledWith(['/']);
      });
    });

    it('should dispatch a RouterNavigation action when auth.HomeRedirect is dispatched with ROLE_ADMIN', () => {
      const action = new HomeRedirect({ userRoles: [{ name: UserRoles.ROLE_ADMIN, userPermissions: [] }] });

      actions$.stream = hot('-a---', { a: action });

      effects.homeRedirect$.subscribe(() => {
        expect(routerService.navigate).toHaveBeenCalledWith(['/']);
      });
    });

    it('should dispatch a RouterNavigation action when auth.HomeRedirect is dispatched with other role', () => {
      const action = new HomeRedirect({ userRoles: [{ name: 'ROLE_MODERATOR', userPermissions: [] }] });

      actions$.stream = hot('-a---', { a: action });

      effects.homeRedirect$.subscribe(() => {
        expect(routerService.navigate).toHaveBeenCalledWith(['/']);
      });
    });
  });

  // describe('logout$', () => {
  //   it('should return an auth.LogoutSuccess action if logout succeeds', () => {
  //     const action = new Logout();
  //     const completion = new LogoutSuccess();

  //     actions$.stream = hot('-a---', { a: action });
  //     const response = cold('-a|', {});
  //     const expected = cold('--b', { b: completion });
  //     authService.logout = jasmine.createSpy().and.callFake(() => response);

  //     expect(effects.logout$).toBeObservable(expected);
  //   });

  //   it('should return a new auth.LoginFailure if the login service throws', () => {
  //     const action = new Logout();
  //     const error = 'Server error';
  //     const completion = new LogoutFailure(error);

  //     actions$.stream = hot('-a---', { a: action });
  //     const response = cold('-#|', {}, error);
  //     const expected = cold('--b', { b: completion });
  //     authService.logout = jasmine.createSpy().and.callFake(() => response);

  //     expect(effects.logout$).toBeObservable(expected);
  //   });
  // });

  // describe('logoutSuccess$', () => {
  //   it('should return an auth.ReloadPage action after logout succeeds', () => {
  //     const action = new LogoutSuccess();
  //     const completion = new ReloadPage();

  //     actions$.stream = hot('-a---', { a: action });
  //     const expected = cold('-b', { b: completion });

  //     expect(effects.logoutSuccess$).toBeObservable(expected);
  //   });
  // });
// });
