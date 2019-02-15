import { NgModule, ErrorHandler, Injector, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { TranslateModule } from '@ngx-translate/core';

import { FullLayoutComponent, PageNotFoundComponent, SimpleLayoutComponent } from './containers';
import { NavItemComponent, LanguageSwitchComponent, FooterComponent } from './components';
import { LayoutEffects } from './effects';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { AppHttpInterceptor } from './interceptors/app-http.interceptor';
import { SharedModule } from '../shared';

export const COMPONENTS = [
  // containers
  FullLayoutComponent,
  SimpleLayoutComponent,
  PageNotFoundComponent,
  // components
  FooterComponent,
  LanguageSwitchComponent,
  NavItemComponent
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    TranslateModule.forChild(),
    SharedModule,
    EffectsModule.forFeature([LayoutEffects])
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS,
})
export class CoreModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: JwtInterceptor,
          multi: true
        },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AppHttpInterceptor,
          multi: true
        },
      ],
    };
  }
}
