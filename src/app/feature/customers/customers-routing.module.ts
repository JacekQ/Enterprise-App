import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CustomersComponent } from './containers/customers.component';
import { CustomerEditComponent, CustomerListComponent } from './components';
import { RoleAdminGuard } from 'src/app/auth/services';

const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  {
    path: '',
    component: CustomersComponent,
    children: [
      {
        path: 'list',
        component: CustomerListComponent,
        data: {
          title: 'menu.customers'
        }
      },
      {
        path: 'edit/:id',
        component: CustomerEditComponent,
        data: {
          title: 'menu.customers'
        },
        canActivate: [RoleAdminGuard]
      },
      {
        path: 'new',
        component: CustomerEditComponent,
        data: {
          title: 'menu.customers'
        },
        canActivate: [RoleAdminGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomersRoutingModule { }
