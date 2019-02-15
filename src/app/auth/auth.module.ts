import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { LayoutModule } from '@angular/cdk/layout';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AuthComponent } from './containers';
import { LoginComponent } from './components';
import { MaterialModule } from '../material';
import { SharedModule } from '../shared';
import { reducers } from './store/reducers';
import { AuthEffects } from './store/effects/auth.effects';
import { AuthenticationService, AuthGuard, RoleFrontGuard, RoleAdminGuard, NotAuthGuard, RoleUserGuard } from './services';

@NgModule({
  declarations: [AuthComponent, LoginComponent],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    LayoutModule,
    TranslateModule.forChild(),
    SharedModule,
    MaterialModule,
    StoreModule.forFeature('auth', reducers),
    EffectsModule.forFeature([AuthEffects])
  ]
})
export class AuthModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AuthModule,
      providers: [
        AuthenticationService,
        AuthGuard,
        RoleAdminGuard,
        RoleFrontGuard,
        NotAuthGuard,
        RoleUserGuard,
      ],
    };
  }
}
