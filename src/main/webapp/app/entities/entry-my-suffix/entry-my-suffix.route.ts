import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { EntryMySuffixComponent } from './entry-my-suffix.component';
import { EntryMySuffixDetailComponent } from './entry-my-suffix-detail.component';
import { EntryMySuffixPopupComponent } from './entry-my-suffix-dialog.component';
import { EntryMySuffixDeletePopupComponent } from './entry-my-suffix-delete-dialog.component';

export const entryRoute: Routes = [
    {
        path: 'entry-my-suffix',
        component: EntryMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhiptestApp.entry.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'entry-my-suffix/:id',
        component: EntryMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhiptestApp.entry.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const entryPopupRoute: Routes = [
    {
        path: 'entry-my-suffix-new',
        component: EntryMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhiptestApp.entry.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'entry-my-suffix/:id/edit',
        component: EntryMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhiptestApp.entry.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'entry-my-suffix/:id/delete',
        component: EntryMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhiptestApp.entry.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
