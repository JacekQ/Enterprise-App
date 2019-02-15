import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator, Sort, MatDialog, MatTableDataSource } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { merge, Subject } from 'rxjs';
import { takeUntil, debounceTime, map, filter } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import * as _ from 'lodash';

import * as fromRoot from '../../../../reducers';

import { User, UsersData } from '../../models';
import { UsersService } from '../../services';
import {
  SortDirection,
  MobileSortFiltersComponent,
  MOBILE_FILTERS_DIALOG_CONFIG
} from 'src/app/shared';
import { UserListSortFilters } from '../../enums';
import { UserListTableComponent } from '../user-list-table';
import { UserListMobileFiltersComponent } from '../user-list-filters';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, OnDestroy, AfterViewInit {
  isMobile: boolean;
  displayedColumns = [];
  dataSource: MatTableDataSource<User>;
  selection: SelectionModel<User>;

  filtersForm: FormGroup;

  isLoading = false;

  filterOptions = {
    search: [
      { value: '', labelKey: '', label: 'all' },
    ],
    company: [],
    sortTypes: [
      {
        value: UserListSortFilters.id,
        label:
          'users.users.filters.sort_types.' + UserListSortFilters.id
      },
      {
        value: UserListSortFilters.username,
        label:
          'users.users.filters.sort_types.' + UserListSortFilters.username
      },
      {
        value: UserListSortFilters.firstName,
        label:
          'users.users.filters.sort_types.' + UserListSortFilters.firstName
      },
      {
        value: UserListSortFilters.lastName,
        label:
          'users.users.filters.sort_types.' + UserListSortFilters.lastName
      },
      {
        value: UserListSortFilters.email,
        label:
          'users.users.filters.sort_types.' + UserListSortFilters.email
      },
    ]
  };

  data: UsersData;
  custonersData: [];
  dataLength = 0;

  private columnsForSmallScreen = ['compactView'];
  private columnsForLargeScreen = [
    'select',
    'id',
    'username',
    'firstName',
    'lastName',
    'email',
    'image',
    'role',
  ];
  private sort: Sort = { active: null, direction: SortDirection.ASC };
  private sortChange: Subject<Sort> = new Subject<Sort>();

  private unsubscribe: Subject<void> = new Subject<void>();

  @ViewChild('paginator') paginator: MatPaginator;
  @ViewChild('tableCU') tableCU: UserListTableComponent;

  constructor(
    public dialog: MatDialog,
    private store: Store<fromRoot.State>,
    private router: Router,
    private route: ActivatedRoute,
    private userService: UsersService,
  ) {
    this.dataSource = new MatTableDataSource();
    this.selection = new SelectionModel<User>(true, []);
  }

  ngAfterViewInit() { }

  ngOnInit() {
    this.isLoading = true;
    this.initScreenObserver();
    this.initFilters();
    this.setFiltersParams(this.route.snapshot.queryParams);
    this.initDataSource();
    this.initRouterSubscription();
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  openSortModal() {
    this.dialog
      .open(MobileSortFiltersComponent, {
        ...MOBILE_FILTERS_DIALOG_CONFIG,
        data: {
          filterOptions: this.filterOptions,
          sort: this.sort
        }
      })
      .afterClosed()
      .pipe(
        takeUntil(this.unsubscribe),
        filter(value => value)
      )
      .subscribe(sort => this.onSortChange(sort));
  }

  openFiltersModal() {
    const mobileFiltersForm = this.userService.getUserListFiltersForm();
    mobileFiltersForm.get('filters').setValue(this.filtersForm.value['filters']);

    this.dialog
      .open(UserListMobileFiltersComponent, {
        ...MOBILE_FILTERS_DIALOG_CONFIG,
        data: {
          filterOptions: this.filterOptions,
          filtersForm: mobileFiltersForm
        }
      })
      .afterClosed()
      .pipe(
        takeUntil(this.unsubscribe),
        filter(value => value)
      )
      .subscribe(filters => this.onFiltersChange(filters));
  }

  onFiltersChange(value): void {
    this.filtersForm.get('filters').setValue(value['filters']);
  }

  getFiltersActiveLength() {
    let filtersActive = 0;
    filtersActive += Object.values(this.filtersForm.value['filters']).filter(val => val).length;

    return filtersActive;
  }

  private initFilters(): void {
    this.filtersForm = this.userService.getUserListFiltersForm();
  }

  private initRouterSubscription(): void {
    this.route.queryParams
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(params =>
        this.userService.getUsers(params)
          .pipe(
            map(resp => {
              return {users: resp.body, noOfUsers: resp.body.length};
            })
          )
          .subscribe(data => {
            this.data = data.users;
            this.selection.clear();
            // this.dataSource.data = data.users;
            this.dataSource = new MatTableDataSource(data.users);
            this.dataLength = data.noOfUsers;
            this.dataSource.paginator = this.paginator;
            this.isLoading = false;
          })
      );
  }

  private initDataSource(): void {
    this.filtersForm
      .get('filters')
      .valueChanges.pipe(takeUntil(this.unsubscribe))
      .subscribe(value => {
        this.paginator.pageIndex = 0;
      });

    const dataSource = merge(
      this.paginator.page,
      this.filtersForm.get('filters').valueChanges,
      this.sortChange,
    )
      .pipe(
        debounceTime(200),
        map(() => this.getFilterParams())
      )
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(data => {
        this.router.navigate(['/users'], { queryParams: data });
      });
  }

  private setFiltersParams(filterParams) {
    if (filterParams._sort) {
      this.sort = {
        active: filterParams._sort,
        direction: filterParams._order || SortDirection.ASC
      };
      this.tableCU.updateSort(this.sort);
    }

    // tylko przy częściowym pobieraniu danych
    if (filterParams._page) {
      this.paginator.pageIndex = filterParams._page;
    }

    if (filterParams._limit) {
      this.paginator.pageSize = filterParams._limit;
    }

    const filtersFG = this.filtersForm.get('filters');
    if (filterParams.q) {
      filtersFG.get('search').patchValue(filterParams.q);
    }
  }

  private getFilterParams(): any {
    const filterParams = {};
    const { filters: {
        search
      },
    } = this.filtersForm.value;

    if (this.sort.active && this.sort.direction) {
      filterParams['_sort'] = this.sort.active;
      filterParams['_order'] = this.sort.direction;
    }

    // if (this.paginator.pageIndex) {
    //   filterParams['_start'] = this.paginator.pageIndex * this.paginator.pageSize;
    //   filterParams['_limit'] = this.paginator.pageSize;
    // }
    // if (this.paginator.pageSize > 10) {
    //   filterParams['_limit'] = this.paginator.pageSize;
    // }

    if (search) {
      filterParams['q'] = search;
    }

    return filterParams;
  }

  private initScreenObserver(): void {
    this.store
      .pipe(
        select(fromRoot.getScreenIsMobile),
        takeUntil(this.unsubscribe)
      )
      .subscribe((isMobile: boolean) => {
        this.isMobile = isMobile;
        this.displayedColumns = isMobile
          ? this.columnsForSmallScreen
          : this.columnsForLargeScreen;
      });
  }

  lengthChanged(value): void {
    this.dataLength = value;
  }

  onSortChange(value): void {
    const { sortActive, sortDirection } = value;
    if (sortActive) {
      this.sort = { active: sortActive, direction: sortDirection };
      this.sortChange.next(value);
    }
  }

  onTableSortChange(value: Sort): void {
    this.sort = value;
    this.sortChange.next(value);
  }
}
