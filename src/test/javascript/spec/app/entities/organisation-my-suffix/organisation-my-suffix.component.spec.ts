/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';

import { JhiptestTestModule } from '../../../test.module';
import { OrganisationMySuffixComponent } from '../../../../../../main/webapp/app/entities/organisation-my-suffix/organisation-my-suffix.component';
import { OrganisationMySuffixService } from '../../../../../../main/webapp/app/entities/organisation-my-suffix/organisation-my-suffix.service';
import { OrganisationMySuffix } from '../../../../../../main/webapp/app/entities/organisation-my-suffix/organisation-my-suffix.model';

describe('Component Tests', () => {

    describe('OrganisationMySuffix Management Component', () => {
        let comp: OrganisationMySuffixComponent;
        let fixture: ComponentFixture<OrganisationMySuffixComponent>;
        let service: OrganisationMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhiptestTestModule],
                declarations: [OrganisationMySuffixComponent],
                providers: [
                    OrganisationMySuffixService
                ]
            })
            .overrideTemplate(OrganisationMySuffixComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(OrganisationMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(OrganisationMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new OrganisationMySuffix(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.organisations[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
