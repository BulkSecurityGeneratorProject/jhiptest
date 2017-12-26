/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { JhiptestTestModule } from '../../../test.module';
import { PhoneMySuffixDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/phone-my-suffix/phone-my-suffix-delete-dialog.component';
import { PhoneMySuffixService } from '../../../../../../main/webapp/app/entities/phone-my-suffix/phone-my-suffix.service';

describe('Component Tests', () => {

    describe('PhoneMySuffix Management Delete Component', () => {
        let comp: PhoneMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<PhoneMySuffixDeleteDialogComponent>;
        let service: PhoneMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhiptestTestModule],
                declarations: [PhoneMySuffixDeleteDialogComponent],
                providers: [
                    PhoneMySuffixService
                ]
            })
            .overrideTemplate(PhoneMySuffixDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PhoneMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PhoneMySuffixService);
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
