import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule, Store } from '@ngrx/store';

import { SelectionPanelComponent } from './selection-panel.component';
import * as fromRoot from '../../../reducers';
import * as LayoutActions from '../../../core/actions/layout.actions';

describe('SelectionPanelComponent', () => {
  let component: SelectionPanelComponent;
  let fixture: ComponentFixture<SelectionPanelComponent>;
  let store: Store<fromRoot.State>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot(fromRoot.reducers)
      ],
      declarations: [SelectionPanelComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    store = TestBed.get(Store);
    fixture = TestBed.createComponent(SelectionPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set sticky = true if pinOnTop is true and scrollTopThreshold is defined', () => {
    component.scrollTopThreshold = 100;
    store.dispatch(new LayoutActions.ScrollChange(250));

    expect(component.sticky).toBe(true);
  });

  it('should set sticky = false scrollTop is below scrollTopThreshold', () => {
    component.scrollTopThreshold = 200;
    store.dispatch(new LayoutActions.ScrollChange(250));

    expect(component.sticky).toBe(true);

    store.dispatch(new LayoutActions.ScrollChange(50));

    expect(component.sticky).toBe(false);
  });

  it('should recalcualte sticky value after pinOnTop changed', async( () => {
    component.scrollTopThreshold = 100;
    store.dispatch(new LayoutActions.ScrollChange(250));

    expect(component.sticky).toBe(true);

    component.pinOnTop = false;
    component.ngOnChanges();

    expect(component.sticky).toBe(false);
  }));

  it('should recalcualte sticky value after scrollTopThreshold changed', async( () => {
    component.scrollTopThreshold = 100;
    store.dispatch(new LayoutActions.ScrollChange(250));

    expect(component.sticky).toBe(true);

    component.scrollTopThreshold = 300;
    component.ngOnChanges();

    expect(component.sticky).toBe(false);
  }));
});
