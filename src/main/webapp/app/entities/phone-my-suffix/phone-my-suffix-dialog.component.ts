import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { PhoneMySuffix } from './phone-my-suffix.model';
import { PhoneMySuffixPopupService } from './phone-my-suffix-popup.service';
import { PhoneMySuffixService } from './phone-my-suffix.service';
import { EntryMySuffix, EntryMySuffixService } from '../entry-my-suffix';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-phone-my-suffix-dialog',
    templateUrl: './phone-my-suffix-dialog.component.html'
})
export class PhoneMySuffixDialogComponent implements OnInit {

    phone: PhoneMySuffix;
    isSaving: boolean;

    entries: EntryMySuffix[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private phoneService: PhoneMySuffixService,
        private entryService: EntryMySuffixService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.entryService
            .query({filter: 'phone-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.phone.entryId) {
                    this.entries = res.json;
                } else {
                    this.entryService
                        .find(this.phone.entryId)
                        .subscribe((subRes: EntryMySuffix) => {
                            this.entries = [subRes].concat(res.json);
                        }, (subRes: ResponseWrapper) => this.onError(subRes.json));
                }
            }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.phone.id !== undefined) {
            this.subscribeToSaveResponse(
                this.phoneService.update(this.phone));
        } else {
            this.subscribeToSaveResponse(
                this.phoneService.create(this.phone));
        }
    }

    private subscribeToSaveResponse(result: Observable<PhoneMySuffix>) {
        result.subscribe((res: PhoneMySuffix) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: PhoneMySuffix) {
        this.eventManager.broadcast({ name: 'phoneListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackEntryById(index: number, item: EntryMySuffix) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-phone-my-suffix-popup',
    template: ''
})
export class PhoneMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private phonePopupService: PhoneMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.phonePopupService
                    .open(PhoneMySuffixDialogComponent as Component, params['id']);
            } else {
                this.phonePopupService
                    .open(PhoneMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
