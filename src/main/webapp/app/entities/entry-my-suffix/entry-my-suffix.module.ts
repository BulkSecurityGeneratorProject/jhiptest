import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhiptestSharedModule } from '../../shared';
import {
    EntryMySuffixService,
    EntryMySuffixPopupService,
    EntryMySuffixComponent,
    EntryMySuffixDetailComponent,
    EntryMySuffixDialogComponent,
    EntryMySuffixPopupComponent,
    EntryMySuffixDeletePopupComponent,
    EntryMySuffixDeleteDialogComponent,
    entryRoute,
    entryPopupRoute,
} from './';

const ENTITY_STATES = [
    ...entryRoute,
    ...entryPopupRoute,
];

@NgModule({
    imports: [
        JhiptestSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        EntryMySuffixComponent,
        EntryMySuffixDetailComponent,
        EntryMySuffixDialogComponent,
        EntryMySuffixDeleteDialogComponent,
        EntryMySuffixPopupComponent,
        EntryMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        EntryMySuffixComponent,
        EntryMySuffixDialogComponent,
        EntryMySuffixPopupComponent,
        EntryMySuffixDeleteDialogComponent,
        EntryMySuffixDeletePopupComponent,
    ],
    providers: [
        EntryMySuffixService,
        EntryMySuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhiptestEntryMySuffixModule {}
