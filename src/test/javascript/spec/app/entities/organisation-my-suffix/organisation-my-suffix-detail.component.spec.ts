/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';

import { JhiptestTestModule } from '../../../test.module';
import { OrganisationMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/organisation-my-suffix/organisation-my-suffix-detail.component';
import { OrganisationMySuffixService } from '../../../../../../main/webapp/app/entities/organisation-my-suffix/organisation-my-suffix.service';
import { OrganisationMySuffix } from '../../../../../../main/webapp/app/entities/organisation-my-suffix/organisation-my-suffix.model';

describe('Component Tests', () => {

    describe('OrganisationMySuffix Management Detail Component', () => {
        let comp: OrganisationMySuffixDetailComponent;
        let fixture: ComponentFixture<OrganisationMySuffixDetailComponent>;
        let service: OrganisationMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhiptestTestModule],
                declarations: [OrganisationMySuffixDetailComponent],
                providers: [
                    OrganisationMySuffixService
                ]
            })
            .overrideTemplate(OrganisationMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(OrganisationMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(OrganisationMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new OrganisationMySuffix(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.organisation).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
