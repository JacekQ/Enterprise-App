import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';

import { User } from '../models';

export class UsersDataSource extends DataSource<User> {
    public constructor(private users$: Observable<User[]>) {
        super();
    }

    public connect(collectionViewer: CollectionViewer): Observable<User[]> {
        return this.users$; // .do(console.log.bind(console))
    }

    public disconnect(collectionViewer: CollectionViewer): void {
    }
}
