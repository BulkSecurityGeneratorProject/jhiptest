/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { JhiptestTestModule } from '../../../test.module';
import { MembershipMySuffixDialogComponent } from '../../../../../../main/webapp/app/entities/membership-my-suffix/membership-my-suffix-dialog.component';
import { MembershipMySuffixService } from '../../../../../../main/webapp/app/entities/membership-my-suffix/membership-my-suffix.service';
import { MembershipMySuffix } from '../../../../../../main/webapp/app/entities/membership-my-suffix/membership-my-suffix.model';
import { PersonMySuffixService } from '../../../../../../main/webapp/app/entities/person-my-suffix';
import { OrganisationMySuffixService } from '../../../../../../main/webapp/app/entities/organisation-my-suffix';

describe('Component Tests', () => {

    describe('MembershipMySuffix Management Dialog Component', () => {
        let comp: MembershipMySuffixDialogComponent;
        let fixture: ComponentFixture<MembershipMySuffixDialogComponent>;
        let service: MembershipMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhiptestTestModule],
                declarations: [MembershipMySuffixDialogComponent],
                providers: [
                    PersonMySuffixService,
                    OrganisationMySuffixService,
                    MembershipMySuffixService
                ]
            })
            .overrideTemplate(MembershipMySuffixDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(MembershipMySuffixDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MembershipMySuffixService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new MembershipMySuffix(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.membership = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'membershipListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new MembershipMySuffix();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.membership = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'membershipListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
