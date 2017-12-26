import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhiptestSharedModule } from '../../shared';
import {
    OrganisationMySuffixService,
    OrganisationMySuffixPopupService,
    OrganisationMySuffixComponent,
    OrganisationMySuffixDetailComponent,
    OrganisationMySuffixDialogComponent,
    OrganisationMySuffixPopupComponent,
    OrganisationMySuffixDeletePopupComponent,
    OrganisationMySuffixDeleteDialogComponent,
    organisationRoute,
    organisationPopupRoute,
} from './';

const ENTITY_STATES = [
    ...organisationRoute,
    ...organisationPopupRoute,
];

@NgModule({
    imports: [
        JhiptestSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        OrganisationMySuffixComponent,
        OrganisationMySuffixDetailComponent,
        OrganisationMySuffixDialogComponent,
        OrganisationMySuffixDeleteDialogComponent,
        OrganisationMySuffixPopupComponent,
        OrganisationMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        OrganisationMySuffixComponent,
        OrganisationMySuffixDialogComponent,
        OrganisationMySuffixPopupComponent,
        OrganisationMySuffixDeleteDialogComponent,
        OrganisationMySuffixDeletePopupComponent,
    ],
    providers: [
        OrganisationMySuffixService,
        OrganisationMySuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhiptestOrganisationMySuffixModule {}
