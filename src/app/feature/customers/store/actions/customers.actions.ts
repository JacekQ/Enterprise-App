import { Action } from '@ngrx/store';
import { Customer } from '../../models';

export enum CustomersActionTypes {
  GetCustomers = '[Customers] Get Customers',
  GetCustomersSuccess = '[Customers] Get Customers Success',
  GetCustomersFailure = '[Customers] Get Customers Failure',
  SaveCustomer = '[Customers] Save Customer',
  DeleteCustomer = '[Customers] Delete Customer',
  AddCustomer = '[Customers] Add Customer',
  ReloadCustomers = '[Customers] Reload Customer'
}

export class ReloadCustomers implements Action {
    readonly type = CustomersActionTypes.ReloadCustomers;
}

export class GetCustomers implements Action {
    readonly type = CustomersActionTypes.GetCustomers;

    constructor(public payload: any) { }
}

export class GetCustomersSuccess implements Action {
    readonly type = CustomersActionTypes.GetCustomersSuccess;

    constructor(public payload: any) { }
}

export class GetCustomersFailure implements Action {
    readonly type = CustomersActionTypes.GetCustomersFailure;

    constructor(public payload: any) { }
}

export class SaveCustomer implements Action {
    readonly type = CustomersActionTypes.SaveCustomer;

    constructor(public payload: Customer) { }
}

export class AddCustomer implements Action {
    readonly type = CustomersActionTypes.AddCustomer;

    constructor(public payload: any) { }
}

export class DeleteCustomer implements Action {
  readonly type = CustomersActionTypes.DeleteCustomer;

  constructor(public payload: number) {}
}

export type CustomersActionsUnion =
    ReloadCustomers |
    GetCustomers |
    GetCustomersSuccess |
    GetCustomersFailure |
    SaveCustomer |
    DeleteCustomer |
    AddCustomer;

