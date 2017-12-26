import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhiptestSharedModule } from '../../shared';
import {
    MembershipMySuffixService,
    MembershipMySuffixPopupService,
    MembershipMySuffixComponent,
    MembershipMySuffixDetailComponent,
    MembershipMySuffixDialogComponent,
    MembershipMySuffixPopupComponent,
    MembershipMySuffixDeletePopupComponent,
    MembershipMySuffixDeleteDialogComponent,
    membershipRoute,
    membershipPopupRoute,
} from './';

const ENTITY_STATES = [
    ...membershipRoute,
    ...membershipPopupRoute,
];

@NgModule({
    imports: [
        JhiptestSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        MembershipMySuffixComponent,
        MembershipMySuffixDetailComponent,
        MembershipMySuffixDialogComponent,
        MembershipMySuffixDeleteDialogComponent,
        MembershipMySuffixPopupComponent,
        MembershipMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        MembershipMySuffixComponent,
        MembershipMySuffixDialogComponent,
        MembershipMySuffixPopupComponent,
        MembershipMySuffixDeleteDialogComponent,
        MembershipMySuffixDeletePopupComponent,
    ],
    providers: [
        MembershipMySuffixService,
        MembershipMySuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhiptestMembershipMySuffixModule {}
