import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MatMenuModule } from '@angular/material';
import { StoreModule, Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';

import { TranslateTestModule } from '../../../tests';

import { LanguageSwitchComponent } from './language-switch.component';
import * as fromRoot from '../../../reducers';
import * as LayoutActions from '../../actions/layout.actions';

describe('LanguageSwitchComponent', () => {
  let component: LanguageSwitchComponent;
  let fixture: ComponentFixture<LanguageSwitchComponent>;
  let store: Store<fromRoot.State>;
  let translate: TranslateService;
  let translateGetSpy: jasmine.Spy;
  let http: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        TranslateTestModule,
        MatMenuModule,
        StoreModule.forRoot(fromRoot.reducers)
      ],
      declarations: [
        LanguageSwitchComponent
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LanguageSwitchComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callFake(key => of(key));
    translate = TestBed.get(TranslateService);
    translateGetSpy = spyOn(translate, 'get').and.callThrough();
    http = TestBed.get(HttpTestingController);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should trigger ChangeLanguage action from onLanguageChange method', () => {
    const action = new LayoutActions.ChangeLanguage({ language: 'en' });
    component.onLanguageChange('en');

    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(action);
  });

});
