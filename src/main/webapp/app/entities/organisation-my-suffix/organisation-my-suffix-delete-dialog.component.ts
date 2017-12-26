import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { OrganisationMySuffix } from './organisation-my-suffix.model';
import { OrganisationMySuffixPopupService } from './organisation-my-suffix-popup.service';
import { OrganisationMySuffixService } from './organisation-my-suffix.service';

@Component({
    selector: 'jhi-organisation-my-suffix-delete-dialog',
    templateUrl: './organisation-my-suffix-delete-dialog.component.html'
})
export class OrganisationMySuffixDeleteDialogComponent {

    organisation: OrganisationMySuffix;

    constructor(
        private organisationService: OrganisationMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.organisationService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'organisationListModification',
                content: 'Deleted an organisation'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-organisation-my-suffix-delete-popup',
    template: ''
})
export class OrganisationMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private organisationPopupService: OrganisationMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.organisationPopupService
                .open(OrganisationMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
