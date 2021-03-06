import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EstateComponent } from './estate.component';
import { EstateDetailComponent } from './estate-detail/estate-detail.component';
import { EstateListComponent } from './estate-list/estate-list.component';
import { EstateCreateComponent } from './estate-create/estate-create.component';
import { EstateRoutingModule } from './estate-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    EstateComponent,
    EstateDetailComponent,
    EstateListComponent,
    EstateCreateComponent],
  imports: [
    CommonModule,
    EstateRoutingModule,
    SharedModule
  ]
})
export class EstateModule { }
