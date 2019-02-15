import { NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';

import { httpTranslateLoaderFactory } from '../app/app.module';

@NgModule({
  imports: [
    HttpClientTestingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  exports: [HttpClientTestingModule, TranslateModule],
  providers: [TranslateService]
})
export class TranslateTestModule { }
