import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { EntryMySuffix } from './entry-my-suffix.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class EntryMySuffixService {

    private resourceUrl = SERVER_API_URL + 'api/entries';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/entries';

    constructor(private http: Http) { }

    create(entry: EntryMySuffix): Observable<EntryMySuffix> {
        const copy = this.convert(entry);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(entry: EntryMySuffix): Observable<EntryMySuffix> {
        const copy = this.convert(entry);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<EntryMySuffix> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res));
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    search(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceSearchUrl, options)
            .map((res: any) => this.convertResponse(res));
    }

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        const result = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            result.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return new ResponseWrapper(res.headers, result, res.status);
    }

    /**
     * Convert a returned JSON object to EntryMySuffix.
     */
    private convertItemFromServer(json: any): EntryMySuffix {
        const entity: EntryMySuffix = Object.assign(new EntryMySuffix(), json);
        return entity;
    }

    /**
     * Convert a EntryMySuffix to a JSON which can be sent to the server.
     */
    private convert(entry: EntryMySuffix): EntryMySuffix {
        const copy: EntryMySuffix = Object.assign({}, entry);
        return copy;
    }
}
