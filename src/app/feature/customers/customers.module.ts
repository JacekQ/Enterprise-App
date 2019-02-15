import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { LayoutModule } from '@angular/cdk/layout';
import { TranslateModule } from '@ngx-translate/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { CustomersRoutingModule } from './customers-routing.module';
import {
  CustomerEditComponent,
  CustomerDetailsComponent,
  CustomerListComponent,
  CustomerListFiltersComponent,
  CustomerListTableComponent,
  CustomerListMobileFiltersComponent,
} from './components';
import { CustomersComponent } from './containers';
import { SharedModule } from '../../shared';

import * as fromCustomer from './store/reducers/customers.reducer';
import { CustomersEffects } from './store/effects/customers.effects';
import { MaterialModule } from '../../material';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CustomersRoutingModule,
    LayoutModule,
    TranslateModule.forChild(),
    SharedModule,
    MaterialModule,
    StoreModule.forFeature('customers', fromCustomer.reducer),
    EffectsModule.forFeature([CustomersEffects])
  ],
  declarations: [
    CustomersComponent,
    CustomerDetailsComponent,
    CustomerEditComponent,
    CustomerListComponent,
    CustomerListTableComponent,
    CustomerListFiltersComponent,
    CustomerListMobileFiltersComponent,
  ],
  entryComponents: [CustomerListMobileFiltersComponent, CustomerDetailsComponent]
})
export class CustomersModule { }
