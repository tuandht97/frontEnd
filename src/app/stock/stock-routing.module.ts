import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../guards/auth.guard';

import { StockComponent } from './stock.component';
import { StockDetailComponent } from './stock-detail/stock-detail.component';
import { StockListComponent } from './stock-list/stock-list.component';

const router: Routes = [
    {
        path: '',
        component: StockComponent,
        children: [
            {
                path: '',
                component: StockListComponent,
                canActivate: [AuthGuard],
                data: { roles: 'Admin' }
            },
            {
                path: ':code',
                component: StockDetailComponent,
                canActivate: [AuthGuard],
            }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(router)
    ],
    exports: [RouterModule]
})
export class StockRoutingModule { }
