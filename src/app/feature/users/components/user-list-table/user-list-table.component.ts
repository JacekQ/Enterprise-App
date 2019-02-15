import { Component, OnInit, Input, ViewChild, Output, OnDestroy, EventEmitter } from '@angular/core';
import { MatTableDataSource, MatSort, Sort, MatDialog, } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Subject, Observable } from 'rxjs';
import { takeUntil, filter } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import * as _ from 'lodash';

import { User } from '../../models';
import * as fromRoot from '../../../../reducers';
import * as fromAuth from '../../../../auth/store/reducers';

import { CONFIRM_DIALOG_CONFIG, ConfirmModalData, ConfirmModalComponent } from '../../../../shared';
import { UsersService } from '../../services';

@Component({
  selector: 'app-user-list-table',
  templateUrl: './user-list-table.component.html',
  styleUrls: ['./user-list-table.component.scss']
})
export class UserListTableComponent implements OnInit, OnDestroy {

  @Input() dataSource: MatTableDataSource<User>;
  @Input() selection: SelectionModel<User>;
  @Input() isMobile: boolean;
  @Input() displayedColumns: string[];

  @Output() sortChanged: EventEmitter<Sort> = new EventEmitter<Sort>();
  @Output() Deleted: EventEmitter<number> = new EventEmitter<number>();

  language: string;

  @ViewChild(MatSort) sort: MatSort;

  private unsubscribe: Subject<void> = new Subject<void>();
  isAdmin$: Observable<boolean>;

  constructor(
    public dialog: MatDialog,
    private router: Router,
    public translate: TranslateService,
    private store: Store<fromRoot.State>,
    public userService: UsersService
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

  openDeleteModal(user) {
    const modalTitle = this.translate.instant(
      'users.users.delete_user_modal.modal_title',
      { user: user.firstName + ' ' + user.lastName }
    );
    const modalContent = this.translate.instant('users.users.delete_user_modal.modal_content');
    const discardBtn = this.translate.instant('users.users.delete_user_modal.discard_btn');
    const confirmBtn = this.translate.instant('users.users.delete_user_modal.confirm_btn');

    const data = new ConfirmModalData(modalTitle, confirmBtn, discardBtn, modalContent);

    this.dialog
      .open(ConfirmModalComponent, { data, ...CONFIRM_DIALOG_CONFIG })
      .afterClosed()
      .pipe( takeUntil(this.unsubscribe), filter(value => value) )
      .subscribe(resp => {
        this.userService.deleteUser(user.id)
        .subscribe(() => {
          this.dataSource.data = this.dataSource.data.filter(item => item.id !== user.id);
          this.Deleted.emit(this.dataSource.data.length);
        });
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
