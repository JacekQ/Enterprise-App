import { reducer } from './auth.reducer';
import * as fromAuth from './auth.reducer';
import {
  // LogoutSuccess,
  // GetUserDataSuccess,
  // GetUserDataFailure
} from '../actions/auth.actions';
import { User } from '../../models/user';

describe('AuthReducer', () => {
    describe('undefined action', () => {
        it('should return the default state', () => {
            const action = {} as any;

            const result = reducer(undefined, action);

            expect(result).toBe(fromAuth.initialState);
        });
    });


    // describe('GetUserDataSuccess', () => {
    //     it('should add a user set loggedIn to true in auth state', () => {
    //         const user = { username: 'test' } as User;
    //         const createAction = new GetUserDataSuccess({ user });

    //         const expectedResult = {
    //             loggedIn: true,
    //             user: user,
    //             error: null,
    //             userPermissions: [],
    //             userRoles: []
    //         };

    //         const result = reducer(fromAuth.initialState, createAction);

    //         expect(result).toEqual(expectedResult);
    //     });
    // });

    // describe('GetUserDataFailure', () => {
    //     it('should set error in auth state ', () => {
    //         const error = 'server error';
    //         const createAction = new GetUserDataFailure({ error });

    //         const expectedResult = {
    //             loggedIn: false,
    //             user: null,
    //             error: error,
    //             userPermissions: [],
    //             userRoles: []
    //         };

    //         const result = reducer(fromAuth.initialState, createAction);

    //         expect(result).toEqual(expectedResult);
    //     });
    // });

    // describe('LogoutSuccess', () => {
    //     it('should remove a user, set loggedIn to false in auth state', () => {
    //         const user = { username: 'test' } as User;
    //         const createAction = new LogoutSuccess();
    //         const state = {
    //             loggedIn: true,
    //             user: user,
    //             error: null,
    //             userPermissions: [],
    //             userRoles: []
    //         };

    //         const expectedResult = {
    //             loggedIn: false,
    //             user: null,
    //             error: null,
    //             userPermissions: [],
    //             userRoles: []
    //         };

    //         const result = reducer(state, createAction);

    //         expect(result).toEqual(expectedResult);
    //     });
    // });
});
