import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { PhoneMySuffix } from './phone-my-suffix.model';
import { PhoneMySuffixService } from './phone-my-suffix.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-phone-my-suffix',
    templateUrl: './phone-my-suffix.component.html'
})
export class PhoneMySuffixComponent implements OnInit, OnDestroy {
phones: PhoneMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private phoneService: PhoneMySuffixService,
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
            this.phoneService.search({
                query: this.currentSearch,
                }).subscribe(
                    (res: ResponseWrapper) => this.phones = res.json,
                    (res: ResponseWrapper) => this.onError(res.json)
                );
            return;
       }
        this.phoneService.query().subscribe(
            (res: ResponseWrapper) => {
                this.phones = res.json;
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
        this.registerChangeInPhones();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: PhoneMySuffix) {
        return item.id;
    }
    registerChangeInPhones() {
        this.eventSubscriber = this.eventManager.subscribe('phoneListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
