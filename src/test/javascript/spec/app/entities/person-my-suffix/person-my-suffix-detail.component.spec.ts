/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';

import { JhiptestTestModule } from '../../../test.module';
import { PersonMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/person-my-suffix/person-my-suffix-detail.component';
import { PersonMySuffixService } from '../../../../../../main/webapp/app/entities/person-my-suffix/person-my-suffix.service';
import { PersonMySuffix } from '../../../../../../main/webapp/app/entities/person-my-suffix/person-my-suffix.model';

describe('Component Tests', () => {

    describe('PersonMySuffix Management Detail Component', () => {
        let comp: PersonMySuffixDetailComponent;
        let fixture: ComponentFixture<PersonMySuffixDetailComponent>;
        let service: PersonMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhiptestTestModule],
                declarations: [PersonMySuffixDetailComponent],
                providers: [
                    PersonMySuffixService
                ]
            })
            .overrideTemplate(PersonMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PersonMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PersonMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new PersonMySuffix(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.person).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
