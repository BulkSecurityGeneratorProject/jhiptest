import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { MembershipMySuffix } from './membership-my-suffix.model';
import { MembershipMySuffixService } from './membership-my-suffix.service';

@Component({
    selector: 'jhi-membership-my-suffix-detail',
    templateUrl: './membership-my-suffix-detail.component.html'
})
export class MembershipMySuffixDetailComponent implements OnInit, OnDestroy {

    membership: MembershipMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private membershipService: MembershipMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInMemberships();
    }

    load(id) {
        this.membershipService.find(id).subscribe((membership) => {
            this.membership = membership;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInMemberships() {
        this.eventSubscriber = this.eventManager.subscribe(
            'membershipListModification',
            (response) => this.load(this.membership.id)
        );
    }
}
