import { BrowserModule } from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import {PagSeguroModule} from './pag-seguro/pag-seguro.module';
import 'rxjs/add/operator/map';

import { SMNUIModule } from 'ng-smn-ui';
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    SMNUIModule,
    PagSeguroModule
  ],
  providers: [],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  bootstrap: [AppComponent]
})
export class AppModule { }
