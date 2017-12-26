/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { JhiptestTestModule } from '../../../test.module';
import { EntryMySuffixDialogComponent } from '../../../../../../main/webapp/app/entities/entry-my-suffix/entry-my-suffix-dialog.component';
import { EntryMySuffixService } from '../../../../../../main/webapp/app/entities/entry-my-suffix/entry-my-suffix.service';
import { EntryMySuffix } from '../../../../../../main/webapp/app/entities/entry-my-suffix/entry-my-suffix.model';
import { OrganisationMySuffixService } from '../../../../../../main/webapp/app/entities/organisation-my-suffix';
import { MembershipMySuffixService } from '../../../../../../main/webapp/app/entities/membership-my-suffix';

describe('Component Tests', () => {

    describe('EntryMySuffix Management Dialog Component', () => {
        let comp: EntryMySuffixDialogComponent;
        let fixture: ComponentFixture<EntryMySuffixDialogComponent>;
        let service: EntryMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhiptestTestModule],
                declarations: [EntryMySuffixDialogComponent],
                providers: [
                    OrganisationMySuffixService,
                    MembershipMySuffixService,
                    EntryMySuffixService
                ]
            })
            .overrideTemplate(EntryMySuffixDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EntryMySuffixDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EntryMySuffixService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new EntryMySuffix(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.entry = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'entryListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new EntryMySuffix();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.entry = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'entryListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
