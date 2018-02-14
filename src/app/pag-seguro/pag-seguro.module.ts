import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagSeguroComponent } from './pag-seguro.component';
import {PagSeguroService} from './pag-seguro.service';
import {FormsModule} from "@angular/forms";
import { SMNUIModule } from 'ng-smn-ui';
import {TransactionsService} from "./transactions.service";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SMNUIModule,
  ],
  declarations: [PagSeguroComponent],
  providers: [ PagSeguroService, TransactionsService],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  exports: [ PagSeguroComponent ]
})
export class PagSeguroModule { }
