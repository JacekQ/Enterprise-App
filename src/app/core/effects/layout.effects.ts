import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { BrowserCookiesService } from '@ngx-utils/cookies/browser';
import { DateAdapter } from '@angular/material';
import * as moment from 'moment';

import {
    ChangeLanguage,
    ChangeLanguageFailure,
    ChangeLanguageSuccess,
    LayoutActionTypes
} from '../actions/layout.actions';

@Injectable()
export class LayoutEffects {

    @Effect()
    changeLanguage$ = this.actions$.pipe(
        ofType<ChangeLanguage>(LayoutActionTypes.ChangeLanguage),
        map(action => action.payload),
        exhaustMap(({ language }) =>
            this.translateService
                .use(language)
                .pipe(
                    map(() => {
                        moment.locale(language);
                        this.dateAdapter.setLocale(language);
                        return new ChangeLanguageSuccess({ language });
                    }),
                    catchError(error => of(new ChangeLanguageFailure(error)))
                )
        )
    );

    @Effect({ dispatch: false })
    changeLanguageSuccess$ = this.actions$.pipe(
        ofType<ChangeLanguageSuccess>(LayoutActionTypes.ChangeLanguageSuccess),
        tap(action => {
            if (action.payload.language) {
                this.cookies.put('usr_lang', action.payload.language);
            }
        })

    );

    constructor(
        private actions$: Actions,
        private translateService: TranslateService,
        private cookies: BrowserCookiesService,
        private dateAdapter: DateAdapter<any>
    ) { }
}
