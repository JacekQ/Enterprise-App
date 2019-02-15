import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContactsComponent } from './containers/contacts.component';
import {
  ContactEditComponent,
  ContactListComponent
} from './components';
import { RoleAdminGuard } from 'src/app/auth/services';

const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  {
    path: '',
    component: ContactsComponent,
    children: [
      {
        path: 'list',
        component: ContactListComponent,
        data: {
          title: 'menu.contacts'
        }
      },
      {
        path: 'edit/:id',
        component: ContactEditComponent,
        data: {
          title: 'menu.contacts'
        }
      },
      {
        path: 'new',
        component: ContactEditComponent,
        data: {
          title: 'menu.contacts'
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
export class ContactsRoutingModule { }
