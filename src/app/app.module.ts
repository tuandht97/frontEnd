import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';

import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';
import { HistorytranComponent } from './historytran/historytran.component';
import { ExchangeComponent } from './exchange/exchange.component';
import { AssetComponent } from './asset/asset.component';
import { CreateStockComponent } from './create-stock/create-stock.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SellCodeComponent } from './sell-code/sell-code.component';
import { ListCodeComponent } from './list-code/list-code.component';
import { BuyComponent } from './buy/buy.component';
import { DetailComponent } from './detail/detail.component';

import { AuthService } from './services/auth.service';
import { AuthGuard } from './guards/auth.guard';
import { ListEstateComponent } from './list-estate/list-estate.component';
import { CreateEstateComponent } from './create-estate/create-estate.component';

import { JwtInterceptor } from '../app/auth/jwt.interceptor';
import { SecurityComponent } from './security/security.component';

import { SharedModule } from './shared/shared.module';

export function tokenGetter() {
  return localStorage.getItem('access_token');
}

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    FooterComponent,
    HistorytranComponent,
    ExchangeComponent,
    AssetComponent,
    CreateStockComponent,
    LoginComponent,
    RegisterComponent,
    SellCodeComponent,
    ListCodeComponent,
    BuyComponent,
    DetailComponent,
    ListEstateComponent,
    CreateEstateComponent,
    SecurityComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['localhost:4000'],
        blacklistedRoutes: ['localhost:4000/api/users/login']
      }
    }),
    SharedModule.forRoot()
  ],
  providers: [
    AuthService,
    AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
  entryComponents: []
})
export class AppModule { }