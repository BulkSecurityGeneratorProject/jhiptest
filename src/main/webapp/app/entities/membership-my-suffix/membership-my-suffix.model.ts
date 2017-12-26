import { BaseEntity } from './../../shared';

export class MembershipMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public type?: string,
        public functionName?: string,
        public sortKey?: number,
        public personId?: number,
        public organisationId?: number,
        public entries?: BaseEntity[],
    ) {
    }
}
