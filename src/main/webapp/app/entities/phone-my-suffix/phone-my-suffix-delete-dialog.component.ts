import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { PhoneMySuffix } from './phone-my-suffix.model';
import { PhoneMySuffixPopupService } from './phone-my-suffix-popup.service';
import { PhoneMySuffixService } from './phone-my-suffix.service';

@Component({
    selector: 'jhi-phone-my-suffix-delete-dialog',
    templateUrl: './phone-my-suffix-delete-dialog.component.html'
})
export class PhoneMySuffixDeleteDialogComponent {

    phone: PhoneMySuffix;

    constructor(
        private phoneService: PhoneMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.phoneService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'phoneListModification',
                content: 'Deleted an phone'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-phone-my-suffix-delete-popup',
    template: ''
})
export class PhoneMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private phonePopupService: PhoneMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.phonePopupService
                .open(PhoneMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
