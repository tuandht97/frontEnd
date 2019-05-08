import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../guards/auth.guard';

import { UserComponent } from './user.component';
import { UserAssetsComponent } from './user-assets/user-assets.component';
import { UserSecurityComponent } from './user-security/user-security.component';

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
