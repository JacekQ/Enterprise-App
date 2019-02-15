import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { MaterialModule } from '../material';

import {
  CustomDateFilterComponent,
  MobileSortFiltersComponent,
  SpinnerComponent,
  SelectionPanelComponent,
  ConfirmModalComponent,
  MobileFilterComponent
} from './components';
import {
  DateTimeFormatPipe,
  DateFormatPipe
} from './pipes';

const COMPONENTS = [
  CustomDateFilterComponent,
  MobileSortFiltersComponent,
  SelectionPanelComponent,
  MobileFilterComponent,
  SpinnerComponent
];

const DIRECTIVES = [
];

const ENTRY_COMPONENTS = [
  ConfirmModalComponent,
  MobileSortFiltersComponent
];

const PIPES = [
  DateTimeFormatPipe,
  DateFormatPipe
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    TranslateModule.forChild(),
    MaterialModule
  ],
  declarations: [
    ...COMPONENTS,
    ...DIRECTIVES,
    ...ENTRY_COMPONENTS,
    ...PIPES,
    MobileFilterComponent
  ],
  entryComponents: ENTRY_COMPONENTS,
  exports: [
    ...COMPONENTS,
    ...DIRECTIVES,
    ...ENTRY_COMPONENTS,
    ...PIPES,
    MaterialModule
  ]
})
export class SharedModule { }
