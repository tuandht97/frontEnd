import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../guards/auth.guard';

import { EstateComponent } from './estate.component';
import { EstateCreateComponent } from './estate-create/estate-create.component';
import { EstateDetailComponent } from './estate-detail/estate-detail.component';
import { EstateListComponent } from './estate-list/estate-list.component';

const router: Routes = [
    {
        path: '',
        component: EstateComponent,
        children: [
            {
                path: '',
                component: EstateListComponent,
                canActivate: [AuthGuard],
                data: { roles: ['Admin', 'Seller'] }
            },
            {
                path: 'create',
                component: EstateCreateComponent,
                canActivate: [AuthGuard],
                data: { roles: 'Seller' }
            },
            {
                path: ':id',
                component: EstateDetailComponent,
                canActivate: [AuthGuard],
                data: { roles: ['Admin', 'Seller'] }
            }
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
export class EstateRoutingModule { }
