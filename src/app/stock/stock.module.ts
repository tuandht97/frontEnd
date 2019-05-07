import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StockComponent } from './stock.component';
import { StockListComponent } from './stock-list/stock-list.component';
import { StockCreateComponent } from './stock-create/stock-create.component';
import { StockDetailComponent } from './stock-detail/stock-detail.component';

import { StockRoutingModule } from './stock-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    StockComponent,
    StockListComponent,
    StockCreateComponent,
    StockDetailComponent
  ],
  imports: [
    CommonModule,
    StockRoutingModule,
    SharedModule
  ]
})
export class StockModule { }
