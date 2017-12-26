import { BaseEntity } from './../../shared';

export class EntryMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public type?: string,
        public sortKey?: number,
        public organisationId?: number,
        public membershipId?: number,
    ) {
    }
}
