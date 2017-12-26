import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { OrganisationMySuffix } from './organisation-my-suffix.model';
import { OrganisationMySuffixPopupService } from './organisation-my-suffix-popup.service';
import { OrganisationMySuffixService } from './organisation-my-suffix.service';
import { MembershipMySuffix, MembershipMySuffixService } from '../membership-my-suffix';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-organisation-my-suffix-dialog',
    templateUrl: './organisation-my-suffix-dialog.component.html'
})
export class OrganisationMySuffixDialogComponent implements OnInit {

    organisation: OrganisationMySuffix;
    isSaving: boolean;

    parents: OrganisationMySuffix[];

    memberships: MembershipMySuffix[];

    organisations: OrganisationMySuffix[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private organisationService: OrganisationMySuffixService,
        private membershipService: MembershipMySuffixService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.organisationService
            .query({filter: 'child-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.organisation.parentId) {
                    this.parents = res.json;
                } else {
                    this.organisationService
                        .find(this.organisation.parentId)
                        .subscribe((subRes: OrganisationMySuffix) => {
                            this.parents = [subRes].concat(res.json);
                        }, (subRes: ResponseWrapper) => this.onError(subRes.json));
                }
            }, (res: ResponseWrapper) => this.onError(res.json));
        this.membershipService.query()
            .subscribe((res: ResponseWrapper) => { this.memberships = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.organisationService.query()
            .subscribe((res: ResponseWrapper) => { this.organisations = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.organisation.id !== undefined) {
            this.subscribeToSaveResponse(
                this.organisationService.update(this.organisation));
        } else {
            this.subscribeToSaveResponse(
                this.organisationService.create(this.organisation));
        }
    }

    private subscribeToSaveResponse(result: Observable<OrganisationMySuffix>) {
        result.subscribe((res: OrganisationMySuffix) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: OrganisationMySuffix) {
        this.eventManager.broadcast({ name: 'organisationListModification', content: 'OK'});
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
    selector: 'jhi-organisation-my-suffix-popup',
    template: ''
})
export class OrganisationMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private organisationPopupService: OrganisationMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.organisationPopupService
                    .open(OrganisationMySuffixDialogComponent as Component, params['id']);
            } else {
                this.organisationPopupService
                    .open(OrganisationMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
