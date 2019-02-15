import { Customer } from './customer.model';

export interface CustomersData {
    all?: any;
    noOfCustomers: number;
    customers: Customer[];
}
