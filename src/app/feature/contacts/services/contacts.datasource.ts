import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';

import { Contact } from '../models';

export class ContactsDataSource extends DataSource<Contact> {
    public constructor(private contacts$: Observable<Contact[]>) {
        super();
    }

    public connect(collectionViewer: CollectionViewer): Observable<Contact[]> {
        return this.contacts$; // .do(console.log.bind(console))
    }

    public disconnect(collectionViewer: CollectionViewer): void {
    }
}
