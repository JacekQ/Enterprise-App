import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsersComponent } from './containers/users.component';
import {
  UserEditComponent,
  UserListComponent
} from './components';

const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  {
    path: '',
    component: UsersComponent,
    children: [
      {
        path: 'list',
        component: UserListComponent,
        data: {
          title: 'menu.users'
        }
      },
      {
        path: 'edit/:id',
        component: UserEditComponent,
        data: {
          title: 'menu.users'
        }
      },
      {
        path: 'new',
        component: UserEditComponent,
        data: {
          title: 'menu.users'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
