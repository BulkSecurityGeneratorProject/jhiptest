import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { EntryMySuffix } from './entry-my-suffix.model';
import { EntryMySuffixService } from './entry-my-suffix.service';

@Component({
    selector: 'jhi-entry-my-suffix-detail',
    templateUrl: './entry-my-suffix-detail.component.html'
})
export class EntryMySuffixDetailComponent implements OnInit, OnDestroy {

    entry: EntryMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private entryService: EntryMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInEntries();
    }

    load(id) {
        this.entryService.find(id).subscribe((entry) => {
            this.entry = entry;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInEntries() {
        this.eventSubscriber = this.eventManager.subscribe(
            'entryListModification',
            (response) => this.load(this.entry.id)
        );
    }
}
