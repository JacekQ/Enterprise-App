import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { CustomersService } from '../../services';

@Component({
  selector: 'app-customer-details-component',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.scss']
})
export class CustomerDetailsComponent implements OnInit, OnDestroy {
  contacts: [];
  isLoading = true;
  private unsubscribe: Subject<void> = new Subject<void>();

  constructor(
    public dialogRef: MatDialogRef<CustomerDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private customersService: CustomersService
    ) { }

  ngOnInit() {
    this.customersService.getCustomerContacts(this.data.id)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(res => {
        this.contacts = res.body;
        this.isLoading = false;
      });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
