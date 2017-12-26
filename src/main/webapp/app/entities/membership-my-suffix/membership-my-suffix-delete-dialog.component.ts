import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { MembershipMySuffix } from './membership-my-suffix.model';
import { MembershipMySuffixPopupService } from './membership-my-suffix-popup.service';
import { MembershipMySuffixService } from './membership-my-suffix.service';

@Component({
    selector: 'jhi-membership-my-suffix-delete-dialog',
    templateUrl: './membership-my-suffix-delete-dialog.component.html'
})
export class MembershipMySuffixDeleteDialogComponent {

    membership: MembershipMySuffix;

    constructor(
        private membershipService: MembershipMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.membershipService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'membershipListModification',
                content: 'Deleted an membership'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-membership-my-suffix-delete-popup',
    template: ''
})
export class MembershipMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private membershipPopupService: MembershipMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.membershipPopupService
                .open(MembershipMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
