import { Component, OnInit, Input, ViewChild, Output, OnDestroy, EventEmitter } from '@angular/core';
import { MatTableDataSource, MatSort, Sort, MatDialog, } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { Store, select } from '@ngrx/store';
import { Subject, Observable } from 'rxjs';
import { takeUntil, filter } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';

import { Contact } from '../../models';
import * as fromRoot from '../../../../reducers';
import * as fromAuth from '../../../../auth/store/reducers';

import { CONFIRM_DIALOG_CONFIG, ConfirmModalData, ConfirmModalComponent } from '../../../../shared';
import * as ContactsActions from '../../store/actions/contacts.actions';
import { ContactsService } from '../../services';

@Component({
  selector: 'app-contact-list-table',
  templateUrl: './contact-list-table.component.html',
  styleUrls: ['./contact-list-table.component.scss']
})
export class ContactListTableComponent implements OnInit, OnDestroy {

  @Input() dataSource: MatTableDataSource<Contact>;
  @Input() selection: SelectionModel<Contact>;
  @Input() isMobile: boolean;
  @Input() displayedColumns: string[];

  @Output() sortChanged: EventEmitter<Sort> = new EventEmitter<Sort>();

  custonersData: {};

  isAdmin$: Observable<boolean>;

  language: string;

  @ViewChild(MatSort) sort: MatSort;

  private unsubscribe: Subject<void> = new Subject<void>();

  constructor(
    public dialog: MatDialog,
    public translate: TranslateService,
    private store: Store<fromRoot.State>,
    public contactService: ContactsService
    ) {
      this.isAdmin$ = this.store.pipe(select(fromAuth.getIsAdmin));
    }

  ngOnInit() {
    this.contactService.customerNames
      .pipe(
        takeUntil(this.unsubscribe)
      )
      .subscribe(data => this.custonersData = data);

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

  openDeleteModal(contact) {
    const modalTitle = this.translate.instant(
      'contacts.contacts.delete_contact_modal.modal_title',
      { contact: contact.firstName + ' ' + contact.lastName }
    );
    const modalContent = this.translate.instant('contacts.contacts.delete_contact_modal.modal_content');
    const discardBtn = this.translate.instant('contacts.contacts.delete_contact_modal.discard_btn');
    const confirmBtn = this.translate.instant('contacts.contacts.delete_contact_modal.confirm_btn');

    const data = new ConfirmModalData(modalTitle, confirmBtn, discardBtn, modalContent);

    this.dialog
      .open(ConfirmModalComponent, { data, ...CONFIRM_DIALOG_CONFIG })
      .afterClosed()
      .pipe( takeUntil(this.unsubscribe), filter(value => value) )
      .subscribe(resp => {
        this.store.dispatch(new ContactsActions.DeleteContact(contact.id));
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
