import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator, Sort, MatDialog, MatTableDataSource } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, merge, Subject } from 'rxjs';
import { takeUntil, debounceTime, map, filter } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import * as moment from 'moment';

import * as fromRoot from '../../../../reducers';
import { customersSelectors } from '../../store/selectors';
import * as CustomersActions from '../../store/actions/customers.actions';

import { CustomersService } from '../../services';
import { Customer } from '../../models';
import {
  CustomDateFilter,
  DateTimeTypes,
  SortDirection,
  MobileSortFiltersComponent,
  MOBILE_FILTERS_DIALOG_CONFIG
} from 'src/app/shared';
import { CustomerListSortFilters } from '../../enums';
import { CustomerListTableComponent } from '../customer-list-table';
import { CustomerListMobileFiltersComponent } from '../customer-list-filters';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit, OnDestroy, AfterViewInit {
  isMobile: boolean;
  displayedColumns = [];
  dataSource: MatTableDataSource<Customer>;
  selection: SelectionModel<Customer>;

  filtersForm: FormGroup;

  dateFilter: FormControl;
  customDateFilterApplied: Subject<CustomDateFilter> = new Subject<CustomDateFilter>();

  isLoading$: Observable<boolean>;

  filterOptions = {
    search: [
      { value: '', labelKey: '', label: 'all' },
    ],
    country: [
      // { value: '', labelKey: '', label: 'customers.customers.filters.country.ALL' },
      { value: 'Poland', label: 'Poland' },
      { value: 'England', label: 'England' },
      { value: 'USA', label: 'USA' },
    ],
    created: [
      { value: '', label: DateTimeTypes.ALL },
      { value: DateTimeTypes.MONTH, label: DateTimeTypes.MONTH },
      { value: DateTimeTypes.QUARTER, label: DateTimeTypes.QUARTER },
      { value: DateTimeTypes.YEAR, label: DateTimeTypes.YEAR },
      { value: DateTimeTypes.CUSTOM, label: DateTimeTypes.CUSTOM }
    ],
    sortTypes: [
      {
        value: CustomerListSortFilters.id,
        label:
          'customers.customers.filters.sort_types.' + CustomerListSortFilters.id
      },
      {
        value: CustomerListSortFilters.companyName,
        label:
          'customers.customers.filters.sort_types.' +
          CustomerListSortFilters.companyName
      },
      {
        value: CustomerListSortFilters.address,
        label:
          'customers.customers.filters.sort_types.' +
          CustomerListSortFilters.address
      },
      {
        value: CustomerListSortFilters.city,
        label:
          'customers.customers.filters.sort_types.' + CustomerListSortFilters.city
      },
      {
        value: CustomerListSortFilters.country,
        label:
          'customers.customers.filters.sort_types.' +
          CustomerListSortFilters.country
      },
      {
        value: CustomerListSortFilters.email,
        label:
          'customers.customers.filters.sort_types.' +
          CustomerListSortFilters.email
      },
      {
        value: CustomerListSortFilters.phone,
        label:
          'customers.customers.filters.sort_types.' +
          CustomerListSortFilters.phone
      }
    ]
  };

  data: Customer[];
  dataLength = 0;

  private columnsForSmallScreen = ['compactView'];
  private columnsForLargeScreen = [
    'select',
    'id',
    'companyName',
    'address',
    'city',
    'country',
    // 'email',
    // 'phone',
    'createdAt'
  ];
  private sort: Sort = { active: null, direction: SortDirection.ASC };
  private sortChange: Subject<Sort> = new Subject<Sort>();

  private unsubscribe: Subject<void> = new Subject<void>();

  @ViewChild('paginator') paginator: MatPaginator;
  @ViewChild('tableCU') tableCU: CustomerListTableComponent;

  constructor(
    public dialog: MatDialog,
    private store: Store<fromRoot.State>,
    private router: Router,
    private route: ActivatedRoute,
    private customerService: CustomersService
  ) {
    this.dataSource = new MatTableDataSource();
    this.selection = new SelectionModel<Customer>(true, []);
    this.isLoading$ = this.store.pipe(select(customersSelectors.getIsLoading));
  }

  ngAfterViewInit() { }

  ngOnInit() {
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
    const mobileFiltersForm = this.customerService.getCustomerListFiltersForm();
    if (this.filtersForm.get('dates').disabled) {
      mobileFiltersForm.get('dates').disable();
    } else {
      mobileFiltersForm.get('dates').setValue(this.filtersForm.value['dates']);
    }
    mobileFiltersForm.get('filters').setValue(this.filtersForm.value['filters']);
    mobileFiltersForm.get('dateFilter').setValue(this.filtersForm.value['dateFilter']);

    this.dialog
      .open(CustomerListMobileFiltersComponent, {
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
    this.filtersForm.get('dateFilter').setValue(value['dateFilter']);
    if (value['dates']) {
      this.filtersForm.get('dates').enable();
      this.filtersForm.get('dates').setValue(value['dates']);
    }
  }

  getFiltersActiveLength() {
    let filtersActive = 0;
    filtersActive += Object.values(this.filtersForm.value['filters']).filter(val => val).length;
    if (this.filtersForm.value['dateFilter'] &&
      (this.filtersForm.value['dateFilter'] !== DateTimeTypes.CUSTOM ||
        (this.filtersForm.value['dates'] && (this.filtersForm.value['dates']['fromDate'] || this.filtersForm.value['dates']['toDate']))
      )) {
      filtersActive++;
    }

    return filtersActive;
  }

  private initFilters(): void {
    this.filtersForm = this.customerService.getCustomerListFiltersForm();
  }

  private initRouterSubscription(): void {
    this.route.queryParams
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(params =>
        this.store.dispatch(new CustomersActions.GetCustomers({ params }))
      );
  }

  private initDataSource(): void {
    this.store
      .pipe(
        takeUntil(this.unsubscribe),
        select(customersSelectors.getCustomers)
      )
      .subscribe(data => {
        this.data = data.customers;
        this.selection.clear();
        // this.dataSource.data = data.customers;
        this.dataSource = new MatTableDataSource(data.customers);
        this.dataLength = data.noOfCustomers;
        this.dataSource.paginator = this.paginator;
      });

    const dateFilterChange = this.filtersForm.get('dateFilter').valueChanges
      .pipe(
        filter(value => value !== DateTimeTypes.CUSTOM)
      );

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
      dateFilterChange,
      this.customDateFilterApplied
    )
      .pipe(
        debounceTime(200),
        map(() => this.getFilterParams())
      )
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(data => {
        this.router.navigate(['/customers'], { queryParams: data });
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
    if (filterParams.country) {
      let country;
      if (Array.isArray(filterParams.country)) {
        country = filterParams.country;
      } else {
        country = [filterParams.country];
      }
      filtersFG.get('country').patchValue(country);
    }

    if (filterParams.date) {
      this.filtersForm.get('dateFilter').patchValue(filterParams.date);
    } else {
      const datesFG = this.filtersForm.get('dates');
      let isCustom;
      if (filterParams.fromDate) {
        const fromD = filterParams.fromDate.split('-');
        datesFG.get('fromDate').patchValue(new Date(fromD[0], fromD[1], fromD[2]));
        isCustom = true;
      }
      if (filterParams.toDate) {
        const toD = filterParams.toDate.split('-');
        datesFG.get('toDate').patchValue(new Date(toD[0], toD[1], toD[2]));
        isCustom = true;
      }
      if (isCustom) {
        this.filtersForm.get('dateFilter').patchValue(DateTimeTypes.CUSTOM);
      }
    }
  }

  private getFilterParams(): any {
    const filterParams = {};
    const { filters: { search, country },
      dateFilter, dates } = this.filtersForm.value;

    if (this.sort.active) {
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
    if (dateFilter === DateTimeTypes.CUSTOM) {
      if (dates) {
        const { fromDate, toDate } = dates;
        if (fromDate) {
          const fDate = moment(fromDate);
          // filterParams['fromDate'] = fDate.format('YYYY-MM-DD');
          filterParams['createdAt_gte'] = fDate.format('YYYY-MM-DD');
        }
        if (toDate) {
          const tDate = moment(toDate);
          // filterParams['toDate'] = tDate.format('YYYY-MM-DD');
          filterParams['createdAt_lte'] = tDate.format('YYYY-MM-DD');
        }
      }
    } else {
      if (dateFilter) {
        filterParams['date'] = dateFilter;
      }
    }
    if (country && country.length) {
      filterParams['country'] = country;
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

  onFilterApply(value) {
    this.customDateFilterApplied.next(value);
  }
}
