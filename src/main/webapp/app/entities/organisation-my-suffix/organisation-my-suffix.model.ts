import { BaseEntity } from './../../shared';

export class OrganisationMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public type?: string,
        public name?: string,
        public shortName?: string,
        public sortKey?: number,
        public parentId?: number,
        public entries?: BaseEntity[],
        public membershipId?: number,
        public childId?: number,
    ) {
    }
}
