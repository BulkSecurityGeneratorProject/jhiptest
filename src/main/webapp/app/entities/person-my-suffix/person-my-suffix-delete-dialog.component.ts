import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { PersonMySuffix } from './person-my-suffix.model';
import { PersonMySuffixPopupService } from './person-my-suffix-popup.service';
import { PersonMySuffixService } from './person-my-suffix.service';

@Component({
    selector: 'jhi-person-my-suffix-delete-dialog',
    templateUrl: './person-my-suffix-delete-dialog.component.html'
})
export class PersonMySuffixDeleteDialogComponent {

    person: PersonMySuffix;

    constructor(
        private personService: PersonMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.personService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'personListModification',
                content: 'Deleted an person'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-person-my-suffix-delete-popup',
    template: ''
})
export class PersonMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private personPopupService: PersonMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.personPopupService
                .open(PersonMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
