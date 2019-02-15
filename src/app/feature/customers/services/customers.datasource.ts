import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';

import { Customer } from '../models';

export class CustomersDataSource extends DataSource<Customer> {
    public constructor(private customers$: Observable<Customer[]>) {
        super();
    }

    public connect(collectionViewer: CollectionViewer): Observable<Customer[]> {
        return this.customers$; // .do(console.log.bind(console))
    }

    public disconnect(collectionViewer: CollectionViewer): void {
    }
}
