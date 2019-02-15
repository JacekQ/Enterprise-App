import {
  Component, OnInit, OnDestroy, Input, ChangeDetectorRef,
  OnChanges, ChangeDetectionStrategy
} from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import * as fromRoot from '../../../reducers';

@Component({
  selector: 'app-selection-panel',
  templateUrl: './selection-panel.component.html',
  styleUrls: ['./selection-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectionPanelComponent implements OnInit, OnDestroy, OnChanges {

  @Input() scrollTopThreshold = -1;
  @Input() pinOnTop = true;

  sticky = false;

  private scrollTop = 0;

  private unsubscribe: Subject<void> = new Subject<void>();

  constructor(private store: Store<fromRoot.State>,
    private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.checkSticky();

    this.store.pipe(
      select(fromRoot.getScrollTop),
      takeUntil(this.unsubscribe)
    ).subscribe(scrollTop => {
      this.scrollTop = scrollTop;
      this.checkSticky();
    });
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  ngOnChanges() {
    this.checkSticky();
  }

  private checkSticky() {
    const oldSticky = this.sticky;
    if (this.pinOnTop && this.scrollTop > this.scrollTopThreshold) {
      this.sticky = true;
    } else {
      this.sticky = false;
    }
    if (oldSticky !== this.sticky) {
      this.cdr.detectChanges();
    }
  }

}
