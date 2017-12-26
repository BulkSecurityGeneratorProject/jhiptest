import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { EntryMySuffix } from './entry-my-suffix.model';
import { EntryMySuffixService } from './entry-my-suffix.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-entry-my-suffix',
    templateUrl: './entry-my-suffix.component.html'
})
export class EntryMySuffixComponent implements OnInit, OnDestroy {
entries: EntryMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private entryService: EntryMySuffixService,
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
            this.entryService.search({
                query: this.currentSearch,
                }).subscribe(
                    (res: ResponseWrapper) => this.entries = res.json,
                    (res: ResponseWrapper) => this.onError(res.json)
                );
            return;
       }
        this.entryService.query().subscribe(
            (res: ResponseWrapper) => {
                this.entries = res.json;
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
        this.registerChangeInEntries();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: EntryMySuffix) {
        return item.id;
    }
    registerChangeInEntries() {
        this.eventSubscriber = this.eventManager.subscribe('entryListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
