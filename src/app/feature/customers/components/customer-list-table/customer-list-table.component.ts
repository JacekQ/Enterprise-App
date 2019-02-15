import { Component, OnInit, Input, ViewChild, Output, OnDestroy, EventEmitter } from '@angular/core';
import { MatTableDataSource, MatSort, Sort, MatDialog, } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { Store, select } from '@ngrx/store';
import { Subject, Observable } from 'rxjs';
import { takeUntil, filter } from 'rxjs/operators';

import { Customer } from '../../models';
import * as fromRoot from '../../../../reducers';
import * as fromAuth from '../../../../auth/store/reducers';

import { CustomerDetailsComponent } from '../customer';
import { CONFIRM_DIALOG_CONFIG, ConfirmModalData, ConfirmModalComponent } from 'src/app/shared';
import { TranslateService } from '@ngx-translate/core';
import * as CustomersActions from '../../store/actions/customers.actions';

@Component({
  selector: 'app-customer-list-table',
  templateUrl: './customer-list-table.component.html',
  styleUrls: ['./customer-list-table.component.scss']
})
export class CustomerListTableComponent implements OnInit, OnDestroy {

  @Input() dataSource: MatTableDataSource<Customer>;
  @Input() selection: SelectionModel<Customer>;
  @Input() isMobile: boolean;
  @Input() displayedColumns: string[];

  @Output() sortChanged: EventEmitter<Sort> = new EventEmitter<Sort>();

  language: string;

  @ViewChild(MatSort) sort: MatSort;

  isAdmin$: Observable<boolean>;

  private unsubscribe: Subject<void> = new Subject<void>();

  constructor(
    public dialog: MatDialog,
    public translate: TranslateService,
    private store: Store<fromRoot.State>
    ) {
      this.isAdmin$ = this.store.pipe(select(fromAuth.getIsAdmin));
    }

  ngOnInit() {
    this.sort.sortChange.pipe(
      takeUntil(this.unsubscribe)
    ).subscribe(sort => {
      this.sortChanged.emit(sort);
    });

    this.store
      .pipe(
        select(fromRoot.getLanguage),
        takeUntil(this.unsubscribe)
      ).subscribe((lang: string) => this.language = lang);
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  openDetailsModal(data) {
    this.dialog
      .open(CustomerDetailsComponent, {...CONFIRM_DIALOG_CONFIG, data: data})
      .afterClosed()
      .pipe(
        takeUntil(this.unsubscribe),
        filter(value => value)
      )
      .subscribe(sort => {
        //console.log(sort)
      });
  }

  openDeleteModal(customer) {
    const modalTitle = this.translate.instant(
      'customers.customers.delete_customer_modal.modal_title',
      { customer: customer.companyName}
    );
    const modalContent = this.translate.instant('customers.customers.delete_customer_modal.modal_content');
    const discardBtn = this.translate.instant('customers.customers.delete_customer_modal.discard_btn');
    const confirmBtn = this.translate.instant('customers.customers.delete_customer_modal.confirm_btn');

    const data = new ConfirmModalData(modalTitle, confirmBtn, discardBtn, modalContent);

    this.dialog
      .open(ConfirmModalComponent, { data, ...CONFIRM_DIALOG_CONFIG })
      .afterClosed()
      .pipe( takeUntil(this.unsubscribe), filter(value => value) )
      .subscribe(resp => {
        this.store.dispatch(new CustomersActions.DeleteCustomer(customer.id));
      });
  }

  updateSort(sort: Sort) {
    this.sort.active = sort.active;
    this.sort.direction = sort.direction;
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length || 0;
    const numRows = this.dataSource.data.length || 0;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

}
