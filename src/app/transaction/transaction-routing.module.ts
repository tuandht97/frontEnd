import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../guards/auth.guard';

import { TransactionComponent } from './transaction.component';
import { TransactionCreateComponent } from './transaction-create/transaction-create.component';
import { TransactionListComponent } from './transaction-list/transaction-list.component';

const router: Routes = [
    {
        path: '',
        component: TransactionComponent,
        children: [
            {
                path: '',
                component: TransactionListComponent,
                canActivate: [AuthGuard],
                data: { roles: ['User', 'Seller'] }
            },
            {
                path: 'create/:id',
                component: TransactionCreateComponent,
                canActivate: [AuthGuard],
                data: { roles: 'User' }
            },
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(router)
    ],
    exports: [
        RouterModule
    ]
})
export class TransactionRoutingModule { }
