import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhiptestSharedModule } from '../../shared';
import {
    PersonMySuffixService,
    PersonMySuffixPopupService,
    PersonMySuffixComponent,
    PersonMySuffixDetailComponent,
    PersonMySuffixDialogComponent,
    PersonMySuffixPopupComponent,
    PersonMySuffixDeletePopupComponent,
    PersonMySuffixDeleteDialogComponent,
    personRoute,
    personPopupRoute,
} from './';

const ENTITY_STATES = [
    ...personRoute,
    ...personPopupRoute,
];

@NgModule({
    imports: [
        JhiptestSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        PersonMySuffixComponent,
        PersonMySuffixDetailComponent,
        PersonMySuffixDialogComponent,
        PersonMySuffixDeleteDialogComponent,
        PersonMySuffixPopupComponent,
        PersonMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        PersonMySuffixComponent,
        PersonMySuffixDialogComponent,
        PersonMySuffixPopupComponent,
        PersonMySuffixDeleteDialogComponent,
        PersonMySuffixDeletePopupComponent,
    ],
    providers: [
        PersonMySuffixService,
        PersonMySuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhiptestPersonMySuffixModule {}
