import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PersonMySuffixComponent } from './person-my-suffix.component';
import { PersonMySuffixDetailComponent } from './person-my-suffix-detail.component';
import { PersonMySuffixPopupComponent } from './person-my-suffix-dialog.component';
import { PersonMySuffixDeletePopupComponent } from './person-my-suffix-delete-dialog.component';

export const personRoute: Routes = [
    {
        path: 'person-my-suffix',
        component: PersonMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhiptestApp.person.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'person-my-suffix/:id',
        component: PersonMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhiptestApp.person.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const personPopupRoute: Routes = [
    {
        path: 'person-my-suffix-new',
        component: PersonMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhiptestApp.person.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'person-my-suffix/:id/edit',
        component: PersonMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhiptestApp.person.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'person-my-suffix/:id/delete',
        component: PersonMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhiptestApp.person.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
