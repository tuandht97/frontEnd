import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsComponent } from './forms/forms.component';
import { ButtonsComponent } from './buttons/buttons.component';
import { TablesComponent } from './tables/tables.component';
import { IconsComponent } from './icons/icons.component';
import { TypographyComponent } from './typography/typography.component';
import { AlertsComponent } from './alerts/alerts.component';
import { AccordionsComponent } from './accordions/accordions.component';
import { BadgesComponent } from './badges/badges.component';
import { ProgressbarComponent } from './progressbar/progressbar.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { PaginationComponent } from './pagination/pagination.component';
import { DropdownComponent } from './dropdown/dropdown.component';
import { TooltipsComponent } from './tooltips/tooltips.component';
import { CarouselComponent } from './carousel/carousel.component';
import { TabsComponent } from './tabs/tabs.component';
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
import { EstateComponent } from './estate/estate.component';
import { ListEstateComponent } from './list-estate/list-estate.component';
import { CreateEstateComponent } from './create-estate/create-estate.component';
import { SecurityComponent } from './security/security.component';

import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/exchange', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'forms', component: FormsComponent },
  { path: 'buttons', component: ButtonsComponent },
  { path: 'tables', component: TablesComponent },
  { path: 'icons', component: IconsComponent },
  { path: 'typography', component: TypographyComponent },
  { path: 'alerts', component: AlertsComponent },
  { path: 'accordions', component: AccordionsComponent },
  { path: 'badges', component: BadgesComponent },
  { path: 'progressbar', component: ProgressbarComponent },
  { path: 'breadcrumbs', component: BreadcrumbsComponent },
  { path: 'pagination', component: PaginationComponent },
  { path: 'dropdowns', component: DropdownComponent },
  { path: 'tooltips', component: TooltipsComponent },
  { path: 'carousel', component: CarouselComponent },
  { path: 'tabs', component: TabsComponent },
  { path: 'transaction', component: TransactionComponent, canActivate: [AuthGuard] },
  { path: 'history', component: HistorytranComponent, canActivate: [AuthGuard], data: { roles: ['User', 'Seller'] } },
  { path: 'exchange', component: ExchangeComponent },
  { path: 'asset', component: AssetComponent, canActivate: [AuthGuard], data: { roles: ['User', 'Seller'] } },
  { path: 'create', component: CreateStockComponent, canActivate: [AuthGuard], data: { roles: 'Admin' } },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'sell', component: SellCodeComponent, canActivate: [AuthGuard], data: { roles: 'User' } },
  { path: 'list', component: ListCodeComponent },
  { path: 'buy', component: BuyComponent, canActivate: [AuthGuard], data: { roles: 'User' } },
  { path: 'detail', component: DetailComponent },
  { path: 'create-estate', component: CreateEstateComponent, canActivate: [AuthGuard], data: { roles: 'Seller' } },
  { path: 'estate', component: EstateComponent, canActivate: [AuthGuard], data: { roles: ['Seller', 'Admin'] } },
  { path: 'list-estate', component: ListEstateComponent, canActivate: [AuthGuard], data: { roles: ['Seller', 'Admin'] } },
  { path: 'security', component: SecurityComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
