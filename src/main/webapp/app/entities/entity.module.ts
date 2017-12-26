import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { JhiptestPersonMySuffixModule } from './person-my-suffix/person-my-suffix.module';
import { JhiptestOrganisationMySuffixModule } from './organisation-my-suffix/organisation-my-suffix.module';
import { JhiptestMembershipMySuffixModule } from './membership-my-suffix/membership-my-suffix.module';
import { JhiptestEntryMySuffixModule } from './entry-my-suffix/entry-my-suffix.module';
import { JhiptestPhoneMySuffixModule } from './phone-my-suffix/phone-my-suffix.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        JhiptestPersonMySuffixModule,
        JhiptestOrganisationMySuffixModule,
        JhiptestMembershipMySuffixModule,
        JhiptestEntryMySuffixModule,
        JhiptestPhoneMySuffixModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhiptestEntityModule {}
