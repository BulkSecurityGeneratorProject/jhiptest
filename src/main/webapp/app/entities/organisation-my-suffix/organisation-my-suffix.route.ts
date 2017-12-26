import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { OrganisationMySuffixComponent } from './organisation-my-suffix.component';
import { OrganisationMySuffixDetailComponent } from './organisation-my-suffix-detail.component';
import { OrganisationMySuffixPopupComponent } from './organisation-my-suffix-dialog.component';
import { OrganisationMySuffixDeletePopupComponent } from './organisation-my-suffix-delete-dialog.component';

export const organisationRoute: Routes = [
    {
        path: 'organisation-my-suffix',
        component: OrganisationMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhiptestApp.organisation.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'organisation-my-suffix/:id',
        component: OrganisationMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhiptestApp.organisation.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const organisationPopupRoute: Routes = [
    {
        path: 'organisation-my-suffix-new',
        component: OrganisationMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhiptestApp.organisation.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'organisation-my-suffix/:id/edit',
        component: OrganisationMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhiptestApp.organisation.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'organisation-my-suffix/:id/delete',
        component: OrganisationMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhiptestApp.organisation.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
