import { BaseEntity } from './../../shared';

export class PersonMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public type?: string,
        public firstName?: string,
        public lastName?: string,
        public membershipId?: number,
    ) {
    }
}
