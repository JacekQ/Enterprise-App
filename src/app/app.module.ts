import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import localePL from '@angular/common/locales/pl';
import { MatNativeDateModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { BrowserCookiesModule, BrowserCookiesService } from '@ngx-utils/cookies/browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core';
import { MaterialModule } from './material';

import { reducers, metaReducers } from './reducers';
import { environment } from '../../src/environments/environment';
import { AuthModule } from './auth/auth.module';

// export as function for aot compilation
export function httpTranslateLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

// register locale for pl language
registerLocaleData(localePL, 'pl');

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    // angular
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule,
    HttpClientModule,
    BrowserCookiesModule.forRoot(),
    // tranlations
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (httpTranslateLoaderFactory),
        deps: [HttpClient]
      }
    }),
    // app modules
    AuthModule.forRoot(),
    CoreModule.forRoot(),
    // material
    MaterialModule.forRoot(),
    MatNativeDateModule,
    // app routring
    AppRoutingModule,
    // ngrx
    StoreModule.forRoot(reducers, { metaReducers }),
    StoreRouterConnectingModule.forRoot({
      stateKey: 'router', // This matches the key defined in the map of reducers
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
    EffectsModule.forRoot([]),
  ],
  providers: [
    BrowserCookiesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
