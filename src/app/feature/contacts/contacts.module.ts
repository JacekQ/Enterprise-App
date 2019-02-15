import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { LayoutModule } from '@angular/cdk/layout';
import { TranslateModule } from '@ngx-translate/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { ContactsRoutingModule } from './contacts-routing.module';
import {
  ContactEditComponent,
  ContactListComponent,
  ContactListFiltersComponent,
  ContactListTableComponent,
  ContactListMobileFiltersComponent,
} from './components';
import { ContactsComponent } from './containers';
import { SharedModule } from '../../shared';

import * as fromContact from './store/reducers/contacts.reducer';
import { ContactsEffects } from './store/effects/contacts.effects';
import { MaterialModule } from '../../material';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ContactsRoutingModule,
    LayoutModule,
    TranslateModule.forChild(),
    SharedModule,
    MaterialModule,
    StoreModule.forFeature('contacts', fromContact.reducer),
    EffectsModule.forFeature([ContactsEffects])
  ],
  declarations: [
    ContactsComponent,
    ContactEditComponent,
    ContactListComponent,
    ContactListTableComponent,
    ContactListFiltersComponent,
    ContactListMobileFiltersComponent,
  ],
  entryComponents: [ContactListMobileFiltersComponent]
})
export class ContactsModule { }
