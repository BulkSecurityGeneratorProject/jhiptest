/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { JhiptestTestModule } from '../../../test.module';
import { MembershipMySuffixDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/membership-my-suffix/membership-my-suffix-delete-dialog.component';
import { MembershipMySuffixService } from '../../../../../../main/webapp/app/entities/membership-my-suffix/membership-my-suffix.service';

describe('Component Tests', () => {

    describe('MembershipMySuffix Management Delete Component', () => {
        let comp: MembershipMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<MembershipMySuffixDeleteDialogComponent>;
        let service: MembershipMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhiptestTestModule],
                declarations: [MembershipMySuffixDeleteDialogComponent],
                providers: [
                    MembershipMySuffixService
                ]
            })
            .overrideTemplate(MembershipMySuffixDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(MembershipMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MembershipMySuffixService);
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
