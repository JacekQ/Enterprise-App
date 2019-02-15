import {
    CustomersActionTypes,
    CustomersActionsUnion,
} from '../actions/customers.actions';
import { CustomersData } from '../../models/customers-data.model';

export interface CustomerState {
    data: CustomersData;
    isLoading: boolean;
    error: any;
  }

  const initialState: CustomerState = {
    data: {} as CustomersData,
    isLoading: false,
    error: null
};

export function reducer(
    state: CustomerState = initialState,
    action: CustomersActionsUnion
): CustomerState {
    switch (action.type) {
        case CustomersActionTypes.GetCustomers:
          return {
              ...state,
              isLoading: true
          };

        case CustomersActionTypes.GetCustomersFailure:
          return {
              ...state,
              isLoading: false,
              error: action.payload.error
          };

        case CustomersActionTypes.GetCustomersSuccess:
          return {
              ...state,
              data: { customers: action.payload.data, noOfCustomers: action.payload.length || 0 },
              isLoading: false,
              error: null
          };

        case CustomersActionTypes.SaveCustomer:
          const customer = state.data.customers.find(i => i.id === action.payload.id);
          const index = state.data.customers.indexOf(customer);
          const beforeItems = state.data.customers.slice(0, index);
          const afterItems = state.data.customers.slice(index + 1);
          const customers = [...beforeItems, action.payload, ...afterItems];

          return {
            ...state,
            data: { ...state.data, customers: customers },
            isLoading: false,
            error: null
          };

        case CustomersActionTypes.DeleteCustomer:
          const customersNew = state.data.customers.filter(i => i.id !== action.payload);

          return {
            ...state,
            data: { ...state.data, customers: customersNew, noOfCustomers: customersNew.length },
            isLoading: false,
            error: null
          };

        default:
            return state;
    }
}

export const getCustomers = (state: CustomerState) => state.data;
export const getIsLoading = (state: CustomerState) => state.isLoading;
