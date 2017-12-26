import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { MembershipMySuffix } from './membership-my-suffix.model';
import { MembershipMySuffixService } from './membership-my-suffix.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-membership-my-suffix',
    templateUrl: './membership-my-suffix.component.html'
})
export class MembershipMySuffixComponent implements OnInit, OnDestroy {
memberships: MembershipMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private membershipService: MembershipMySuffixService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private activatedRoute: ActivatedRoute,
        private principal: Principal
    ) {
        this.currentSearch = this.activatedRoute.snapshot && this.activatedRoute.snapshot.params['search'] ?
            this.activatedRoute.snapshot.params['search'] : '';
    }

    loadAll() {
        if (this.currentSearch) {
            this.membershipService.search({
                query: this.currentSearch,
                }).subscribe(
                    (res: ResponseWrapper) => this.memberships = res.json,
                    (res: ResponseWrapper) => this.onError(res.json)
                );
            return;
       }
        this.membershipService.query().subscribe(
            (res: ResponseWrapper) => {
                this.memberships = res.json;
                this.currentSearch = '';
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }

    search(query) {
        if (!query) {
            return this.clear();
        }
        this.currentSearch = query;
        this.loadAll();
    }

    clear() {
        this.currentSearch = '';
        this.loadAll();
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInMemberships();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: MembershipMySuffix) {
        return item.id;
    }
    registerChangeInMemberships() {
        this.eventSubscriber = this.eventManager.subscribe('membershipListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
