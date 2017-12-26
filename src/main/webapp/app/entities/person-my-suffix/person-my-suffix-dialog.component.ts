import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { PersonMySuffix } from './person-my-suffix.model';
import { PersonMySuffixPopupService } from './person-my-suffix-popup.service';
import { PersonMySuffixService } from './person-my-suffix.service';
import { MembershipMySuffix, MembershipMySuffixService } from '../membership-my-suffix';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-person-my-suffix-dialog',
    templateUrl: './person-my-suffix-dialog.component.html'
})
export class PersonMySuffixDialogComponent implements OnInit {

    person: PersonMySuffix;
    isSaving: boolean;

    memberships: MembershipMySuffix[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private personService: PersonMySuffixService,
        private membershipService: MembershipMySuffixService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.membershipService.query()
            .subscribe((res: ResponseWrapper) => { this.memberships = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.person.id !== undefined) {
            this.subscribeToSaveResponse(
                this.personService.update(this.person));
        } else {
            this.subscribeToSaveResponse(
                this.personService.create(this.person));
        }
    }

    private subscribeToSaveResponse(result: Observable<PersonMySuffix>) {
        result.subscribe((res: PersonMySuffix) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: PersonMySuffix) {
        this.eventManager.broadcast({ name: 'personListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackMembershipById(index: number, item: MembershipMySuffix) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-person-my-suffix-popup',
    template: ''
})
export class PersonMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private personPopupService: PersonMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.personPopupService
                    .open(PersonMySuffixDialogComponent as Component, params['id']);
            } else {
                this.personPopupService
                    .open(PersonMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
