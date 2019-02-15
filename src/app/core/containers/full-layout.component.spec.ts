import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule, Store } from '@ngrx/store';
import { of } from 'rxjs';

import { TranslateTestModule } from '../../../tests';

import { FullLayoutComponent } from './full-layout.component';
import { NavItemComponent } from '../components';
import * as fromRoot from '../../reducers';
import * as fromAuth from '../../auth/store/reducers';
import * as AuthActions from '../../auth/store/actions/auth.actions';
import * as LayoutActions from '../actions/layout.actions';
import { User } from '../../auth/models/user';
import { UserRoles } from '../../auth/enums';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'mat-sidenav-container',
  template: '<ng-content></ng-content>'
})
export class MatSidenavContainerMockComponent {
  scrollable = {
    elementScrolled: () => of({ target: { scrollTop: 10 } })
  };
}

describe('FullLayoutComponent', () => {
  let component: FullLayoutComponent;
  let fixture: ComponentFixture<FullLayoutComponent>;
  let store: Store<fromAuth.State>;
  let storeDispatchSpy: jasmine.Spy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        TranslateTestModule,
        StoreModule.forRoot(fromRoot.reducers),
        StoreModule.forFeature('auth', fromAuth.reducers)
      ],
      declarations: [FullLayoutComponent, NavItemComponent, MatSidenavContainerMockComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    const user = {
      id: 1, firstName: 'John', lastName: 'Doe',
      role: [{ name: UserRoles.ROLE_ADMIN }], username: 'jdoe@email.com', email: 'jdoe@email.com', image: ''
    } as User;
    store = TestBed.get(Store);
    // store.dispatch(new AuthActions.GetUserDataSuccess({ user }));
    storeDispatchSpy = spyOn(store, 'dispatch').and.callThrough();
    fixture = TestBed.createComponent(FullLayoutComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch an action on Sidenav open', () => {
    storeDispatchSpy.calls.reset();
    const menuBtn = fixture.debugElement.query(By.css('mat-toolbar button[mat-icon-button]'));

    menuBtn.triggerEventHandler('click', null);

    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(new LayoutActions.OpenSidenav());
  });

  it('should dispatch an action on Sidenav close', () => {
    storeDispatchSpy.calls.reset();
    const menuBtn = fixture.debugElement.query(By.css('.sidenav-close-btn > button[mat-icon-button]'));

    menuBtn.triggerEventHandler('click', null);

    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(new LayoutActions.CloseSidenav());
  });
});
