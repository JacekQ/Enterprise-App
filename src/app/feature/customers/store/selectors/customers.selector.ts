import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromCustomers from '../reducers/customers.reducer';

const getCustomersState = createFeatureSelector<fromCustomers.CustomerState>('customers');

const getCustomers = createSelector(
    getCustomersState,
    fromCustomers.getCustomers
);

const getIsLoading = createSelector(
    getCustomersState,
    fromCustomers.getIsLoading
);

export const customersSelectors = {
    getCustomers,
    getIsLoading
};
