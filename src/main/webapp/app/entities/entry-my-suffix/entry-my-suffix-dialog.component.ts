import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { EntryMySuffix } from './entry-my-suffix.model';
import { EntryMySuffixPopupService } from './entry-my-suffix-popup.service';
import { EntryMySuffixService } from './entry-my-suffix.service';
import { OrganisationMySuffix, OrganisationMySuffixService } from '../organisation-my-suffix';
import { MembershipMySuffix, MembershipMySuffixService } from '../membership-my-suffix';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-entry-my-suffix-dialog',
    templateUrl: './entry-my-suffix-dialog.component.html'
})
export class EntryMySuffixDialogComponent implements OnInit {

    entry: EntryMySuffix;
    isSaving: boolean;

    organisations: OrganisationMySuffix[];

    memberships: MembershipMySuffix[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private entryService: EntryMySuffixService,
        private organisationService: OrganisationMySuffixService,
        private membershipService: MembershipMySuffixService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.organisationService.query()
            .subscribe((res: ResponseWrapper) => { this.organisations = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.membershipService.query()
            .subscribe((res: ResponseWrapper) => { this.memberships = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.entry.id !== undefined) {
            this.subscribeToSaveResponse(
                this.entryService.update(this.entry));
        } else {
            this.subscribeToSaveResponse(
                this.entryService.create(this.entry));
        }
    }

    private subscribeToSaveResponse(result: Observable<EntryMySuffix>) {
        result.subscribe((res: EntryMySuffix) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: EntryMySuffix) {
        this.eventManager.broadcast({ name: 'entryListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackOrganisationById(index: number, item: OrganisationMySuffix) {
        return item.id;
    }

    trackMembershipById(index: number, item: MembershipMySuffix) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-entry-my-suffix-popup',
    template: ''
})
export class EntryMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private entryPopupService: EntryMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.entryPopupService
                    .open(EntryMySuffixDialogComponent as Component, params['id']);
            } else {
                this.entryPopupService
                    .open(EntryMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
