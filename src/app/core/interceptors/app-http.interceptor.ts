import { Injectable, Injector } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import * as AuthActions from '../../auth/store/actions/auth.actions';

@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {
    constructor(private injector: Injector) { }

    handleError(error: Error | HttpErrorResponse) {
        if (error instanceof HttpErrorResponse) {
            // Server or connection error happened
            if (!navigator.onLine) {
                // Handle offline error
                console.log('No Internet Connection');
            } else {
                // Handle Http Error (error.status === 403, 404...)
                if (error.status === 401 || error.status === 403) {
                    // reload to force page send request to server
                    // causing redirect to login server if session expired
                    // const store = this.injector.get(Store);
                    // store.dispatch(new AuthActions.ReloadPage());
                    const router = this.injector.get(Router);
                    router.navigate(['/login']);
                }

                if (error.status === 404) {
                    // const router = this.injector.get(Router);
                    // router.navigate(['/404']);
                }
                console.log(`${error.status} - ${error.message}`);
            }
        } else {
            // Handle Client Error (Angular Error, ReferenceError...)
            // router.navigate(['/error'], { queryParams: { error: error } });
        }
        // Log the error anyway
        console.error('It happens: ', error);
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      return next.handle(req).pipe(
          tap(event => { }, error => {
              this.handleError(error);
          })
      );
    }
}
