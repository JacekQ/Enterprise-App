import {
    ContactsActionTypes,
    ContactsActionsUnion,
} from '../actions/contacts.actions';
import { ContactsData } from '../../models/contacts-data.model';

export interface ContactState {
    data: ContactsData;
    isLoading: boolean;
    error: any;
}

const initialState: ContactState = {
    data: {} as ContactsData,
    isLoading: false,
    error: null
};

export function reducer(
    state: ContactState = initialState,
    action: ContactsActionsUnion
): ContactState {
    switch (action.type) {
        case ContactsActionTypes.GetContacts:
            return {
                ...state,
                isLoading: true
            };
        case ContactsActionTypes.GetContactsFailure:
            return {
                ...state,
                isLoading: false,
                error: action.payload.error
            };
        case ContactsActionTypes.GetContactsSuccess:

            return {
                ...state,
                data: { contacts: action.payload.data, noOfContacts: action.payload.length || 0 },
                isLoading: false,
                error: null
            };
        case ContactsActionTypes.SaveContact:
            const contact = state.data.contacts.find(i => i.id === action.payload.id);
            const index = state.data.contacts.indexOf(contact);
            const beforeItems = state.data.contacts.slice(0, index);
            const afterItems = state.data.contacts.slice(index + 1);
            const contacts = [...beforeItems, action.payload, ...afterItems];

            return {
              ...state,
              data: { ...state.data, contacts: contacts },
              isLoading: false,
              error: null
            };
        case ContactsActionTypes.DeleteContact:
            const contactsNew = state.data.contacts.filter(i => i.id !== action.payload);

            return {
              ...state,
              data: { ...state.data, contacts: contactsNew, noOfContacts: contactsNew.length },
              isLoading: false,
              error: null
            };
        default:
            return state;
    }
}

export const getContacts = (state: ContactState) => state.data;
export const getIsLoading = (state: ContactState) => state.isLoading;
