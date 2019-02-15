import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromContacts from '../reducers/contacts.reducer';

const getContactsState = createFeatureSelector<fromContacts.ContactState>('contacts');

const getContacts = createSelector(
    getContactsState,
    fromContacts.getContacts
);

const getIsLoading = createSelector(
    getContactsState,
    fromContacts.getIsLoading
);

export const contactsSelectors = {
    getContacts,
    getIsLoading
};
