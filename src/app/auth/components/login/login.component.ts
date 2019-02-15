import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { first, takeUntil } from 'rxjs/operators';

import { AuthenticationService } from '../../services';
import * as fromRoot from '../../../reducers';
import * as AuthActions from '../../store/actions/auth.actions';
import * as AuthSelectors from '../../store/reducers';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  submitted = false;
  returnUrl: string;
  error: string;
  private unsubscribe: Subject<void> = new Subject();
  isLoading$: Observable<boolean>;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromRoot.State>,
    private authenticationService: AuthenticationService
  ) {
    this.store.pipe(
      takeUntil(this.unsubscribe),
      select(AuthSelectors.getLoginPageError)
    )
    .subscribe(err => this.error = err);

    this.isLoading$ = this.store.pipe(
      select(AuthSelectors.getLoginPagePending)
    );
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    // reset login status
    this.authenticationService.logout();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '';
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  onChange() {
    this.submitted = false;
    this.error = '';
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.store.dispatch(
      new AuthActions.Login({
        username: this.f.username.value,
        password: this.f.password.value
      })
    );
  }
}
