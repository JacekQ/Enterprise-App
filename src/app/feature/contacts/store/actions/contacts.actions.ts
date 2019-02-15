import { Action } from '@ngrx/store';
import { Contact } from '../../models';

export enum ContactsActionTypes {
  GetContacts = '[Contacts] Get Contacts',
  GetContactsSuccess = '[Contacts] Get Contacts Success',
  GetContactsFailure = '[Contacts] Get Contacts Failure',
  SaveContact = '[Contacts] Save Contact',
  DeleteContact = '[Contacts] Delete Contact',
  AddContact = '[Contacts] Add Contact'
}

export class GetContacts implements Action {
    readonly type = ContactsActionTypes.GetContacts;

    constructor(public payload: any) { }
}

export class GetContactsSuccess implements Action {
    readonly type = ContactsActionTypes.GetContactsSuccess;

    constructor(public payload: any) { }
}

export class GetContactsFailure implements Action {
    readonly type = ContactsActionTypes.GetContactsFailure;

    constructor(public payload: any) { }
}

export class SaveContact implements Action {
    readonly type = ContactsActionTypes.SaveContact;

    constructor(public payload: Contact) { }
}

export class AddContact implements Action {
    readonly type = ContactsActionTypes.AddContact;

    constructor(public payload: any) { }
}

export class DeleteContact implements Action {
  readonly type = ContactsActionTypes.DeleteContact;

  constructor(public payload: number) {}
}

export type ContactsActionsUnion =
    GetContacts |
    GetContactsSuccess |
    GetContactsFailure |
    SaveContact |
    DeleteContact |
    AddContact;

