import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { MembershipMySuffix } from './membership-my-suffix.model';
import { MembershipMySuffixPopupService } from './membership-my-suffix-popup.service';
import { MembershipMySuffixService } from './membership-my-suffix.service';
import { PersonMySuffix, PersonMySuffixService } from '../person-my-suffix';
import { OrganisationMySuffix, OrganisationMySuffixService } from '../organisation-my-suffix';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-membership-my-suffix-dialog',
    templateUrl: './membership-my-suffix-dialog.component.html'
})
export class MembershipMySuffixDialogComponent implements OnInit {

    membership: MembershipMySuffix;
    isSaving: boolean;

    people: PersonMySuffix[];

    organisations: OrganisationMySuffix[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private membershipService: MembershipMySuffixService,
        private personService: PersonMySuffixService,
        private organisationService: OrganisationMySuffixService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.personService.query()
            .subscribe((res: ResponseWrapper) => { this.people = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.organisationService
            .query({filter: 'membership-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.membership.organisationId) {
                    this.organisations = res.json;
                } else {
                    this.organisationService
                        .find(this.membership.organisationId)
                        .subscribe((subRes: OrganisationMySuffix) => {
                            this.organisations = [subRes].concat(res.json);
                        }, (subRes: ResponseWrapper) => this.onError(subRes.json));
                }
            }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.membership.id !== undefined) {
            this.subscribeToSaveResponse(
                this.membershipService.update(this.membership));
        } else {
            this.subscribeToSaveResponse(
                this.membershipService.create(this.membership));
        }
    }

    private subscribeToSaveResponse(result: Observable<MembershipMySuffix>) {
        result.subscribe((res: MembershipMySuffix) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: MembershipMySuffix) {
        this.eventManager.broadcast({ name: 'membershipListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackPersonById(index: number, item: PersonMySuffix) {
        return item.id;
    }

    trackOrganisationById(index: number, item: OrganisationMySuffix) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-membership-my-suffix-popup',
    template: ''
})
export class MembershipMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private membershipPopupService: MembershipMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.membershipPopupService
                    .open(MembershipMySuffixDialogComponent as Component, params['id']);
            } else {
                this.membershipPopupService
                    .open(MembershipMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
