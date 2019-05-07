import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../guards/auth.guard';

import { ItemComponent } from './item.component';
import { ItemCreateComponent } from './item-create/item-create.component';
import { ItemListComponent } from './item-list/item-list.component';

const router: Routes = [
    {
        path: '',
        component: ItemComponent,
        children: [
            {
                path: '',
                component: ItemListComponent,
                canActivate: [AuthGuard],
                data: { roles: ['User', 'Seller'] }
            },
            {
                path: 'create',
                component: ItemCreateComponent,
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
export class ItemRoutingModule { }
