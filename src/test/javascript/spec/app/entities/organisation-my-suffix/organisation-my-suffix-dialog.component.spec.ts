/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { JhiptestTestModule } from '../../../test.module';
import { OrganisationMySuffixDialogComponent } from '../../../../../../main/webapp/app/entities/organisation-my-suffix/organisation-my-suffix-dialog.component';
import { OrganisationMySuffixService } from '../../../../../../main/webapp/app/entities/organisation-my-suffix/organisation-my-suffix.service';
import { OrganisationMySuffix } from '../../../../../../main/webapp/app/entities/organisation-my-suffix/organisation-my-suffix.model';
import { MembershipMySuffixService } from '../../../../../../main/webapp/app/entities/membership-my-suffix';

describe('Component Tests', () => {

    describe('OrganisationMySuffix Management Dialog Component', () => {
        let comp: OrganisationMySuffixDialogComponent;
        let fixture: ComponentFixture<OrganisationMySuffixDialogComponent>;
        let service: OrganisationMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhiptestTestModule],
                declarations: [OrganisationMySuffixDialogComponent],
                providers: [
                    MembershipMySuffixService,
                    OrganisationMySuffixService
                ]
            })
            .overrideTemplate(OrganisationMySuffixDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(OrganisationMySuffixDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(OrganisationMySuffixService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new OrganisationMySuffix(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.organisation = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'organisationListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new OrganisationMySuffix();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.organisation = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'organisationListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
