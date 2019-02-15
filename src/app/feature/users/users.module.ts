import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { LayoutModule } from '@angular/cdk/layout';
import { TranslateModule } from '@ngx-translate/core';

import { UsersRoutingModule } from './users-routing.module';
import { SharedModule } from '../../shared';
import {
  UserEditComponent,
  UserListComponent,
  UserListFiltersComponent,
  UserListMobileFiltersComponent,
  UserListTableComponent
} from './components';
import { UsersComponent } from './containers';

import { MaterialModule } from '../../material';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UsersRoutingModule,
    LayoutModule,
    TranslateModule.forChild(),
    SharedModule,
    MaterialModule,
  ],
  declarations: [
    UsersComponent,
    UserEditComponent,
    UserListComponent,
    UserListTableComponent,
    UserListFiltersComponent,
    UserListMobileFiltersComponent,
  ],
  entryComponents: [UserListMobileFiltersComponent]
})
export class UsersModule { }
