import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { EntryMySuffix } from './entry-my-suffix.model';
import { EntryMySuffixPopupService } from './entry-my-suffix-popup.service';
import { EntryMySuffixService } from './entry-my-suffix.service';

@Component({
    selector: 'jhi-entry-my-suffix-delete-dialog',
    templateUrl: './entry-my-suffix-delete-dialog.component.html'
})
export class EntryMySuffixDeleteDialogComponent {

    entry: EntryMySuffix;

    constructor(
        private entryService: EntryMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.entryService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'entryListModification',
                content: 'Deleted an entry'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-entry-my-suffix-delete-popup',
    template: ''
})
export class EntryMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private entryPopupService: EntryMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.entryPopupService
                .open(EntryMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
