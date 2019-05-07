import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';

import { TransactionComponent } from './transaction/transaction.component';
import { HistorytranComponent } from './historytran/historytran.component';
import { ExchangeComponent } from './exchange/exchange.component';
import { AssetComponent } from './asset/asset.component';
import { CreateStockComponent } from './create-stock/create-stock.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ListCodeComponent } from './list-code/list-code.component';
import { SellCodeComponent } from './sell-code/sell-code.component';
import { BuyComponent } from './buy/buy.component';
import { DetailComponent } from './detail/detail.component';
//import { EstateComponent } from './estate/estate.component';
import { ListEstateComponent } from './list-estate/list-estate.component';
import { CreateEstateComponent } from './create-estate/create-estate.component';
import { SecurityComponent } from './security/security.component';

import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/exchange', pathMatch: 'full' },
  // { path: 'transaction', component: TransactionComponent, canActivate: [AuthGuard] },
  // { path: 'history', component: HistorytranComponent, canActivate: [AuthGuard], data: { roles: ['User', 'Seller'] } },
  { path: 'exchange', component: ExchangeComponent },
  // { path: 'asset', component: AssetComponent, canActivate: [AuthGuard], data: { roles: ['User', 'Seller'] } },
  // { path: 'create', component: CreateStockComponent, canActivate: [AuthGuard], data: { roles: 'Admin' } },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  // { path: 'sell', component: SellCodeComponent, canActivate: [AuthGuard], data: { roles: 'User' } },
  // { path: 'list', component: ListCodeComponent },
  // { path: 'buy', component: BuyComponent, canActivate: [AuthGuard], data: { roles: 'User' } },
  // { path: 'detail', component: DetailComponent },
  // { path: 'create-estate', component: CreateEstateComponent, canActivate: [AuthGuard], data: { roles: 'Seller' } },
  // { path: 'estate', component: EstateComponent, canActivate: [AuthGuard], data: { roles: ['Seller', 'Admin'] } },
  // { path: 'list-estate', component: ListEstateComponent, canActivate: [AuthGuard], data: { roles: ['Seller', 'Admin'] } },
  // { path: 'security', component: SecurityComponent, canActivate: [AuthGuard] }
  {
    path: 'user',
    loadChildren: './user/user.module#UserModule'
  },
  {
    path: 'transaction',
    loadChildren: './transaction/transaction.module#TransactionModule'
  },
  {
    path: 'stock',
    loadChildren: './stock/stock.module#StockModule'
  },
  {
    path: 'item',
    loadChildren: './item/item.module#ItemModule'
  },
  {
    path: 'estate',
    loadChildren: './estate/estate.module#EstateModule'
  }
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules
    })
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }

