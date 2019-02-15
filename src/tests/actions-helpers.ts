import { Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { Observable, EMPTY } from 'rxjs';

@Injectable()
export class TestActions extends Actions {
    constructor() {
        super(EMPTY);
    }

    set stream(source: Observable<any>) {
        this.source = source;
    }
}

export function getActions() {
    return new TestActions();
}
