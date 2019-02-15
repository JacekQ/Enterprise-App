import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { UsersService } from '../../services';
import { User } from '../../models';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {
  isLoading = false;
  userForm: FormGroup;
  entity: User = {
    id: 0,
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    image: '',
    role: null,
  };

  roles = [
    { value: 'ROLE_ADMIN', label: 'Admin'},
    { value: 'ROLE_USER', label: 'User'}
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private userService: UsersService
  ) { }

  ngOnInit() {
    const _entityId = this.route.snapshot.paramMap.get('id') || 0;
    if (_entityId === 0) {
      this.initForm(this.entity);
      return;
    }

    this.isLoading = true;
    this.userService.getUser(_entityId)
    .subscribe(data => {
        this.isLoading = false;
        this.entity = data;
        this.entity.role = data.role[0].name;
        this.initForm(this.entity);
      });
    }

    initForm(user: User) {
      this.userForm = this.fb.group({
        firstName: this.fb.control(user.firstName),
        lastName: this.fb.control(user.lastName),
        email: this.fb.control(user.email),
        username: this.fb.control(user.username),
        image: this.fb.control(user.image),
        role: this.fb.control(user.role),
      });
  }

  onSubmit({ value, valid }: { value: User, valid: boolean }) {
    const newRole = {
      name: [value.role],
      userPermissions: []
    };
    value.role = [newRole];
    this.isLoading = true;
    if (valid) {
      if (this.entity.id > 0) {
        value.id = this.entity.id;
        this.userService.saveUser(value)
          .subscribe(data => {
            this.isLoading = false;
            this.router.navigate(['/users']);
          });
      } else {
        this.userService.addUser(value)
          .subscribe(data => {
            this.isLoading = false;
            this.router.navigate(['/users']);
          });
      }
    }
  }
}
