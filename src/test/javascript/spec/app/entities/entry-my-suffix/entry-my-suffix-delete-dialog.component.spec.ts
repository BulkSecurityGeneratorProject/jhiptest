/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { JhiptestTestModule } from '../../../test.module';
import { EntryMySuffixDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/entry-my-suffix/entry-my-suffix-delete-dialog.component';
import { EntryMySuffixService } from '../../../../../../main/webapp/app/entities/entry-my-suffix/entry-my-suffix.service';

describe('Component Tests', () => {

    describe('EntryMySuffix Management Delete Component', () => {
        let comp: EntryMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<EntryMySuffixDeleteDialogComponent>;
        let service: EntryMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhiptestTestModule],
                declarations: [EntryMySuffixDeleteDialogComponent],
                providers: [
                    EntryMySuffixService
                ]
            })
            .overrideTemplate(EntryMySuffixDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EntryMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EntryMySuffixService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
