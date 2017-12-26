/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { JhiptestTestModule } from '../../../test.module';
import { PersonMySuffixDialogComponent } from '../../../../../../main/webapp/app/entities/person-my-suffix/person-my-suffix-dialog.component';
import { PersonMySuffixService } from '../../../../../../main/webapp/app/entities/person-my-suffix/person-my-suffix.service';
import { PersonMySuffix } from '../../../../../../main/webapp/app/entities/person-my-suffix/person-my-suffix.model';
import { MembershipMySuffixService } from '../../../../../../main/webapp/app/entities/membership-my-suffix';

describe('Component Tests', () => {

    describe('PersonMySuffix Management Dialog Component', () => {
        let comp: PersonMySuffixDialogComponent;
        let fixture: ComponentFixture<PersonMySuffixDialogComponent>;
        let service: PersonMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhiptestTestModule],
                declarations: [PersonMySuffixDialogComponent],
                providers: [
                    MembershipMySuffixService,
                    PersonMySuffixService
                ]
            })
            .overrideTemplate(PersonMySuffixDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PersonMySuffixDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PersonMySuffixService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new PersonMySuffix(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.person = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'personListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new PersonMySuffix();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.person = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'personListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
