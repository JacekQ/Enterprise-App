import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FullLayoutComponent, PageNotFoundComponent, SimpleLayoutComponent } from './core';
import { AuthGuard, RoleFrontGuard, RoleAdminGuard } from './auth/services';
import { LoginComponent } from './auth/components';

const routes: Routes = [
  { path: '', redirectTo: 'customers', pathMatch: 'full' },
  {
    path: '', component: FullLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'customers', loadChildren: './feature/customers/customers.module#CustomersModule',
        data: {
          title: 'menu.customers'
        },
        canActivate: [RoleFrontGuard]
      },
      {
        path: 'contacts', loadChildren: './feature/contacts/contacts.module#ContactsModule',
        data: {
          title: 'menu.contacts'
        },
        canActivate: [RoleFrontGuard]
      },
      {
        path: 'users', loadChildren: './feature/users/users.module#UsersModule',
        data: {
          title: 'menu.users'
        },
        canActivate: [RoleAdminGuard]
      },
    ]
  },
  {
    path: '', component: SimpleLayoutComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent }
    ]
  },
  // Fallback when no prior route is matched
  {
    path: '**', component: PageNotFoundComponent, pathMatch: 'full',
    // canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
