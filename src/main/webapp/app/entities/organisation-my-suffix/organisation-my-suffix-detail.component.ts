import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { OrganisationMySuffix } from './organisation-my-suffix.model';
import { OrganisationMySuffixService } from './organisation-my-suffix.service';

@Component({
    selector: 'jhi-organisation-my-suffix-detail',
    templateUrl: './organisation-my-suffix-detail.component.html'
})
export class OrganisationMySuffixDetailComponent implements OnInit, OnDestroy {

    organisation: OrganisationMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private organisationService: OrganisationMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInOrganisations();
    }

    load(id) {
        this.organisationService.find(id).subscribe((organisation) => {
            this.organisation = organisation;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInOrganisations() {
        this.eventSubscriber = this.eventManager.subscribe(
            'organisationListModification',
            (response) => this.load(this.organisation.id)
        );
    }
}
