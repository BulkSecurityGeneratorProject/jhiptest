import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { OrganisationMySuffix } from './organisation-my-suffix.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class OrganisationMySuffixService {

    private resourceUrl = SERVER_API_URL + 'api/organisations';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/organisations';

    constructor(private http: Http) { }

    create(organisation: OrganisationMySuffix): Observable<OrganisationMySuffix> {
        const copy = this.convert(organisation);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(organisation: OrganisationMySuffix): Observable<OrganisationMySuffix> {
        const copy = this.convert(organisation);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<OrganisationMySuffix> {
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
     * Convert a returned JSON object to OrganisationMySuffix.
     */
    private convertItemFromServer(json: any): OrganisationMySuffix {
        const entity: OrganisationMySuffix = Object.assign(new OrganisationMySuffix(), json);
        return entity;
    }

    /**
     * Convert a OrganisationMySuffix to a JSON which can be sent to the server.
     */
    private convert(organisation: OrganisationMySuffix): OrganisationMySuffix {
        const copy: OrganisationMySuffix = Object.assign({}, organisation);
        return copy;
    }
}
