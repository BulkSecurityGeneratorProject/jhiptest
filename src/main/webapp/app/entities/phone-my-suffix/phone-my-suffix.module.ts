import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhiptestSharedModule } from '../../shared';
import {
    PhoneMySuffixService,
    PhoneMySuffixPopupService,
    PhoneMySuffixComponent,
    PhoneMySuffixDetailComponent,
    PhoneMySuffixDialogComponent,
    PhoneMySuffixPopupComponent,
    PhoneMySuffixDeletePopupComponent,
    PhoneMySuffixDeleteDialogComponent,
    phoneRoute,
    phonePopupRoute,
} from './';

const ENTITY_STATES = [
    ...phoneRoute,
    ...phonePopupRoute,
];

@NgModule({
    imports: [
        JhiptestSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        PhoneMySuffixComponent,
        PhoneMySuffixDetailComponent,
        PhoneMySuffixDialogComponent,
        PhoneMySuffixDeleteDialogComponent,
        PhoneMySuffixPopupComponent,
        PhoneMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        PhoneMySuffixComponent,
        PhoneMySuffixDialogComponent,
        PhoneMySuffixPopupComponent,
        PhoneMySuffixDeleteDialogComponent,
        PhoneMySuffixDeletePopupComponent,
    ],
    providers: [
        PhoneMySuffixService,
        PhoneMySuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhiptestPhoneMySuffixModule {}
