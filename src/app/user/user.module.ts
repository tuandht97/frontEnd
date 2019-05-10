import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { UserAssetsComponent } from './user-assets/user-assets.component';
import { UserSecurityComponent } from './user-security/user-security.component';
import { SharedModule } from '../shared/shared.module';
import { UserCoinComponent } from './user-coin/user-coin.component';

@NgModule({
  declarations: [
    UserComponent,
    UserAssetsComponent,
    UserSecurityComponent,
    UserCoinComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule
  ]
})
export class UserModule { }
