import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { MembershipMySuffixComponent } from './membership-my-suffix.component';
import { MembershipMySuffixDetailComponent } from './membership-my-suffix-detail.component';
import { MembershipMySuffixPopupComponent } from './membership-my-suffix-dialog.component';
import { MembershipMySuffixDeletePopupComponent } from './membership-my-suffix-delete-dialog.component';

export const membershipRoute: Routes = [
    {
        path: 'membership-my-suffix',
        component: MembershipMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhiptestApp.membership.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'membership-my-suffix/:id',
        component: MembershipMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhiptestApp.membership.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const membershipPopupRoute: Routes = [
    {
        path: 'membership-my-suffix-new',
        component: MembershipMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhiptestApp.membership.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'membership-my-suffix/:id/edit',
        component: MembershipMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhiptestApp.membership.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'membership-my-suffix/:id/delete',
        component: MembershipMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhiptestApp.membership.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
