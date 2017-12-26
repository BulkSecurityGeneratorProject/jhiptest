import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PhoneMySuffixComponent } from './phone-my-suffix.component';
import { PhoneMySuffixDetailComponent } from './phone-my-suffix-detail.component';
import { PhoneMySuffixPopupComponent } from './phone-my-suffix-dialog.component';
import { PhoneMySuffixDeletePopupComponent } from './phone-my-suffix-delete-dialog.component';

export const phoneRoute: Routes = [
    {
        path: 'phone-my-suffix',
        component: PhoneMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhiptestApp.phone.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'phone-my-suffix/:id',
        component: PhoneMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhiptestApp.phone.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const phonePopupRoute: Routes = [
    {
        path: 'phone-my-suffix-new',
        component: PhoneMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhiptestApp.phone.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'phone-my-suffix/:id/edit',
        component: PhoneMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhiptestApp.phone.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'phone-my-suffix/:id/delete',
        component: PhoneMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhiptestApp.phone.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
