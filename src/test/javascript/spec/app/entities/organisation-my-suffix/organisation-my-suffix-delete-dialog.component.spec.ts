/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { JhiptestTestModule } from '../../../test.module';
import { OrganisationMySuffixDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/organisation-my-suffix/organisation-my-suffix-delete-dialog.component';
import { OrganisationMySuffixService } from '../../../../../../main/webapp/app/entities/organisation-my-suffix/organisation-my-suffix.service';

describe('Component Tests', () => {

    describe('OrganisationMySuffix Management Delete Component', () => {
        let comp: OrganisationMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<OrganisationMySuffixDeleteDialogComponent>;
        let service: OrganisationMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhiptestTestModule],
                declarations: [OrganisationMySuffixDeleteDialogComponent],
                providers: [
                    OrganisationMySuffixService
                ]
            })
            .overrideTemplate(OrganisationMySuffixDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(OrganisationMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(OrganisationMySuffixService);
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
