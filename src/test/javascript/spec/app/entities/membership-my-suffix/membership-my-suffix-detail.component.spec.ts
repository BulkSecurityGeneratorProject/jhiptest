/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';

import { JhiptestTestModule } from '../../../test.module';
import { MembershipMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/membership-my-suffix/membership-my-suffix-detail.component';
import { MembershipMySuffixService } from '../../../../../../main/webapp/app/entities/membership-my-suffix/membership-my-suffix.service';
import { MembershipMySuffix } from '../../../../../../main/webapp/app/entities/membership-my-suffix/membership-my-suffix.model';

describe('Component Tests', () => {

    describe('MembershipMySuffix Management Detail Component', () => {
        let comp: MembershipMySuffixDetailComponent;
        let fixture: ComponentFixture<MembershipMySuffixDetailComponent>;
        let service: MembershipMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhiptestTestModule],
                declarations: [MembershipMySuffixDetailComponent],
                providers: [
                    MembershipMySuffixService
                ]
            })
            .overrideTemplate(MembershipMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(MembershipMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MembershipMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new MembershipMySuffix(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.membership).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
