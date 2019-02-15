import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator, Sort, MatDialog, MatTableDataSource } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, merge, Subject } from 'rxjs';
import { takeUntil, debounceTime, map, filter } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import * as _ from 'lodash';

import * as fromRoot from '../../../../reducers';
import * as ContactsActions from '../../store/actions/contacts.actions';
import { contactsSelectors } from '../../store/selectors';

import { Contact } from '../../models';
import { ContactsService } from '../../services';
import {
  SortDirection,
  MobileSortFiltersComponent,
  MOBILE_FILTERS_DIALOG_CONFIG
} from 'src/app/shared';
import { ContactListSortFilters } from '../../enums';
import { ContactListTableComponent } from '../contact-list-table';
import { ContactListMobileFiltersComponent } from '../contact-list-filters';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit, OnDestroy, AfterViewInit {
  isMobile: boolean;
  displayedColumns = [];
  dataSource: MatTableDataSource<Contact>;
  selection: SelectionModel<Contact>;

  filtersForm: FormGroup;

  isLoading$: Observable<boolean>;

  filterOptions = {
    search: [
      { value: '', labelKey: '', label: 'all' },
    ],
    company: [],
    sortTypes: [
      {
        value: ContactListSortFilters.id,
        label:
          'contacts.contacts.filters.sort_types.' + ContactListSortFilters.id
      },
      {
        value: ContactListSortFilters.title,
        label:
          'contacts.contacts.filters.sort_types.' + ContactListSortFilters.title
      },
      {
        value: ContactListSortFilters.firstName,
        label:
          'contacts.contacts.filters.sort_types.' + ContactListSortFilters.firstName
      },
      {
        value: ContactListSortFilters.lastName,
        label:
          'contacts.contacts.filters.sort_types.' + ContactListSortFilters.lastName
      },
      {
        value: ContactListSortFilters.email,
        label:
          'contacts.contacts.filters.sort_types.' + ContactListSortFilters.email
      },
      {
        value: ContactListSortFilters.phone,
        label:
          'contacts.contacts.filters.sort_types.' + ContactListSortFilters.phone
      }
    ]
  };

  data: Contact[];
  custonersData: [];
  dataLength = 0;

  private columnsForSmallScreen = ['compactView'];
  private columnsForLargeScreen = [
    'select',
    'id',
    'title',
    'firstName',
    'lastName',
    'email',
    'phone',
    'companyId'
  ];
  private sort: Sort = { active: null, direction: SortDirection.ASC };
  private sortChange: Subject<Sort> = new Subject<Sort>();

  private unsubscribe: Subject<void> = new Subject<void>();

  @ViewChild('paginator') paginator: MatPaginator;
  @ViewChild('tableCU') tableCU: ContactListTableComponent;

  constructor(
    public dialog: MatDialog,
    private store: Store<fromRoot.State>,
    private router: Router,
    private route: ActivatedRoute,
    private contactService: ContactsService,
  ) {
    this.dataSource = new MatTableDataSource();
    this.selection = new SelectionModel<Contact>(true, []);
    this.isLoading$ = this.store.pipe(select(contactsSelectors.getIsLoading));
    this.contactService.customerNames
    .pipe(
      takeUntil(this.unsubscribe)
    )
    .subscribe(data => {
      const keys = Object.keys(data);
      keys.push('');

      this.filterOptions.company = _.sortBy(
        keys.map(key => {
            return { value: key, label: data[key] || 'ALL'};
          }),
          ['label']
        );
      this.custonersData = data;
    });
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
    const mobileFiltersForm = this.contactService.getContactListFiltersForm();
    mobileFiltersForm.get('filters').setValue(this.filtersForm.value['filters']);

    this.dialog
      .open(ContactListMobileFiltersComponent, {
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
    this.filtersForm = this.contactService.getContactListFiltersForm();
  }

  private initRouterSubscription(): void {
    this.route.queryParams
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(params =>
        this.store.dispatch(new ContactsActions.GetContacts({ params }))
      );
  }

  private initDataSource(): void {
    this.store
      .pipe(
        takeUntil(this.unsubscribe),
        select(contactsSelectors.getContacts)
      )
      .subscribe(data => {
        this.data = data.contacts;
        this.selection.clear();
        // this.dataSource.data = data.contacts;
        this.dataSource = new MatTableDataSource(data.contacts);
        this.dataLength = data.noOfContacts;
        this.dataSource.paginator = this.paginator;
      });

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
        this.router.navigate(['/contacts'], { queryParams: data });
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
    if (filterParams.companyId) {
      filtersFG.get('company').patchValue(filterParams.companyId);
    }
  }

  private getFilterParams(): any {
    const filterParams = {};
    const { filters: {
        search,
        company
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

    if (company && company !== '0') {
      filterParams['companyId'] = company;
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
}
