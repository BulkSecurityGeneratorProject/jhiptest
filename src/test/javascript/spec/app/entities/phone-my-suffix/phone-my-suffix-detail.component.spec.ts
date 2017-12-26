/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';

import { JhiptestTestModule } from '../../../test.module';
import { PhoneMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/phone-my-suffix/phone-my-suffix-detail.component';
import { PhoneMySuffixService } from '../../../../../../main/webapp/app/entities/phone-my-suffix/phone-my-suffix.service';
import { PhoneMySuffix } from '../../../../../../main/webapp/app/entities/phone-my-suffix/phone-my-suffix.model';

describe('Component Tests', () => {

    describe('PhoneMySuffix Management Detail Component', () => {
        let comp: PhoneMySuffixDetailComponent;
        let fixture: ComponentFixture<PhoneMySuffixDetailComponent>;
        let service: PhoneMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhiptestTestModule],
                declarations: [PhoneMySuffixDetailComponent],
                providers: [
                    PhoneMySuffixService
                ]
            })
            .overrideTemplate(PhoneMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PhoneMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PhoneMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new PhoneMySuffix(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.phone).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
