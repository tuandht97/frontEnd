import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../guards/auth.guard';

import { UserComponent } from './user.component';
import { UserAssetsComponent } from './user-assets/user-assets.component';
import { UserSecurityComponent } from './user-security/user-security.component';
import { UserCoinComponent } from './user-coin/user-coin.component';
import { UserListComponent } from './user-list/user-list.component';

const userRoutes: Routes = [
    {
        path: '',
        component: UserComponent,
        children: [
            {
                path: '',
                component: UserAssetsComponent,
                canActivate: [AuthGuard],
                data: { roles: ['User', 'Seller'] }
            },
            {
                path: 'security',
                component: UserSecurityComponent,
                canActivate: [AuthGuard]
            },
            {
                path: 'coin',
                component: UserCoinComponent,
                canActivate: [AuthGuard],
                data: { roles: 'User' }
            },
            {
                path: 'list',
                component: UserListComponent,
                canActivate: [AuthGuard],
                data: { roles: 'Admin' }
            }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(userRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class UserRoutingModule { }
