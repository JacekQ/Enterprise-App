import { NgModule, ModuleWithProviders } from '@angular/core';

import {
  MatButtonModule,
  MatExpansionModule,
  MatCardModule,
  MatCheckboxModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatSelectModule,
  MatSidenavModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatPaginatorIntl,
  MatTooltipModule,
  MatDialogModule,
  MatDatepickerModule,
  MatRadioModule,
  MatBadgeModule,
  MatSlideToggleModule,
  MatSnackBarModule
} from '@angular/material';
import { CustomMatPaginatorIntl } from './services/custom-mat-paginator-intl';

const material_modules = [
  MatExpansionModule,
  MatBadgeModule,
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatSelectModule,
  MatSidenavModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatToolbarModule,
  MatTooltipModule
];

@NgModule({
  imports: material_modules,
  exports: material_modules
})
export class MaterialModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: MaterialModule,
      providers: [
        {
          provide: MatPaginatorIntl,
          useClass: CustomMatPaginatorIntl
        }
      ]
    };
  }
}
