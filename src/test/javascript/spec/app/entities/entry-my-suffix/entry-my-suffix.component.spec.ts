/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';

import { JhiptestTestModule } from '../../../test.module';
import { EntryMySuffixComponent } from '../../../../../../main/webapp/app/entities/entry-my-suffix/entry-my-suffix.component';
import { EntryMySuffixService } from '../../../../../../main/webapp/app/entities/entry-my-suffix/entry-my-suffix.service';
import { EntryMySuffix } from '../../../../../../main/webapp/app/entities/entry-my-suffix/entry-my-suffix.model';

describe('Component Tests', () => {

    describe('EntryMySuffix Management Component', () => {
        let comp: EntryMySuffixComponent;
        let fixture: ComponentFixture<EntryMySuffixComponent>;
        let service: EntryMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhiptestTestModule],
                declarations: [EntryMySuffixComponent],
                providers: [
                    EntryMySuffixService
                ]
            })
            .overrideTemplate(EntryMySuffixComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EntryMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EntryMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new EntryMySuffix(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.entries[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
