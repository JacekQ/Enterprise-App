import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';

import * as fromRoot from '../../../reducers';
import * as LayoutActions from '../../actions/layout.actions';

@Component({
  selector: 'app-language-switch',
  templateUrl: './language-switch.component.html',
  styleUrls: ['./language-switch.component.scss']
})
export class LanguageSwitchComponent {
  @Input() type: 'buttons' | 'list';

  languages: Array<string> = ['pl', 'en'];
  selectedLang$: Observable<string>;

  constructor(private store: Store<fromRoot.State>) {
    this.selectedLang$ = this.store.pipe(select(fromRoot.getLanguage));
  }

  onLanguageChange(event) {
    this.store.dispatch(new LayoutActions.ChangeLanguage({ language: event }));
  }
}
