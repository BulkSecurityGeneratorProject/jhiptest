/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';

import { JhiptestTestModule } from '../../../test.module';
import { PersonMySuffixComponent } from '../../../../../../main/webapp/app/entities/person-my-suffix/person-my-suffix.component';
import { PersonMySuffixService } from '../../../../../../main/webapp/app/entities/person-my-suffix/person-my-suffix.service';
import { PersonMySuffix } from '../../../../../../main/webapp/app/entities/person-my-suffix/person-my-suffix.model';

describe('Component Tests', () => {

    describe('PersonMySuffix Management Component', () => {
        let comp: PersonMySuffixComponent;
        let fixture: ComponentFixture<PersonMySuffixComponent>;
        let service: PersonMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhiptestTestModule],
                declarations: [PersonMySuffixComponent],
                providers: [
                    PersonMySuffixService
                ]
            })
            .overrideTemplate(PersonMySuffixComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PersonMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PersonMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new PersonMySuffix(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.people[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
