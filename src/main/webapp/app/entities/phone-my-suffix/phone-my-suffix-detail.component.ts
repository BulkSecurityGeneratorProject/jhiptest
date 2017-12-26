import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { PhoneMySuffix } from './phone-my-suffix.model';
import { PhoneMySuffixService } from './phone-my-suffix.service';

@Component({
    selector: 'jhi-phone-my-suffix-detail',
    templateUrl: './phone-my-suffix-detail.component.html'
})
export class PhoneMySuffixDetailComponent implements OnInit, OnDestroy {

    phone: PhoneMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private phoneService: PhoneMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInPhones();
    }

    load(id) {
        this.phoneService.find(id).subscribe((phone) => {
            this.phone = phone;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInPhones() {
        this.eventSubscriber = this.eventManager.subscribe(
            'phoneListModification',
            (response) => this.load(this.phone.id)
        );
    }
}
