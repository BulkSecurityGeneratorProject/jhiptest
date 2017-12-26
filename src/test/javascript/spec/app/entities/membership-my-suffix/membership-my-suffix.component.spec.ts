/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';

import { JhiptestTestModule } from '../../../test.module';
import { MembershipMySuffixComponent } from '../../../../../../main/webapp/app/entities/membership-my-suffix/membership-my-suffix.component';
import { MembershipMySuffixService } from '../../../../../../main/webapp/app/entities/membership-my-suffix/membership-my-suffix.service';
import { MembershipMySuffix } from '../../../../../../main/webapp/app/entities/membership-my-suffix/membership-my-suffix.model';

describe('Component Tests', () => {

    describe('MembershipMySuffix Management Component', () => {
        let comp: MembershipMySuffixComponent;
        let fixture: ComponentFixture<MembershipMySuffixComponent>;
        let service: MembershipMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhiptestTestModule],
                declarations: [MembershipMySuffixComponent],
                providers: [
                    MembershipMySuffixService
                ]
            })
            .overrideTemplate(MembershipMySuffixComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(MembershipMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MembershipMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new MembershipMySuffix(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.memberships[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
