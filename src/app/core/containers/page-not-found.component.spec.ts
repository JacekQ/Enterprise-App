import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { StoreModule, Store } from '@ngrx/store';

import { TranslateTestModule } from '../../tests';

import { PageNotFoundComponent } from './page-not-found.component';
import * as fromAuth from '../../auth/store/reducers';
import { User } from '../../auth/models/user';
import { GetUserDataSuccess } from '../../auth/store/actions/auth.actions';
import { UserRoles } from '../../auth/enums';

describe('PageNotFoundComponent', () => {
  let component: PageNotFoundComponent;
  let fixture: ComponentFixture<PageNotFoundComponent>;
  let store: Store<fromAuth.State>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        TranslateTestModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature('auth', fromAuth.reducers)
      ],
      declarations: [PageNotFoundComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    store = TestBed.get(Store);
    fixture = TestBed.createComponent(PageNotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  describe('homeRoute', () => {
    it('should take default homeRoute if user is null', () => {
      expect(component.homeRoute).toEqual('/');
    });

    it('should set homeRoute base on userRole for normal user', () => {
      const user = { userRoles: [{ name: UserRoles.ROLE_USER }] } as User;
      store.dispatch(new GetUserDataSuccess({ user }));
      fixture.detectChanges();
      expect(component.homeRoute).toEqual('/');
    });

    it('should set homeRoute base on userRole for admin user', () => {
      const user = { userRoles: [{ name: UserRoles.ROLE_BACK_OFFICE }] } as User;
      store.dispatch(new GetUserDataSuccess({ user }));
      fixture.detectChanges();
      expect(component.homeRoute).toEqual('/back-office');
    });
  });
});
