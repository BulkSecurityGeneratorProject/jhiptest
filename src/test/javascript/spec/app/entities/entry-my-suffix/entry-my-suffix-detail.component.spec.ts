/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';

import { JhiptestTestModule } from '../../../test.module';
import { EntryMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/entry-my-suffix/entry-my-suffix-detail.component';
import { EntryMySuffixService } from '../../../../../../main/webapp/app/entities/entry-my-suffix/entry-my-suffix.service';
import { EntryMySuffix } from '../../../../../../main/webapp/app/entities/entry-my-suffix/entry-my-suffix.model';

describe('Component Tests', () => {

    describe('EntryMySuffix Management Detail Component', () => {
        let comp: EntryMySuffixDetailComponent;
        let fixture: ComponentFixture<EntryMySuffixDetailComponent>;
        let service: EntryMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhiptestTestModule],
                declarations: [EntryMySuffixDetailComponent],
                providers: [
                    EntryMySuffixService
                ]
            })
            .overrideTemplate(EntryMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EntryMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EntryMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new EntryMySuffix(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.entry).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
