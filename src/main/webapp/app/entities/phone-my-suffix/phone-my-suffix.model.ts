import { BaseEntity } from './../../shared';

export class PhoneMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public type?: string,
        public internal?: boolean,
        public external?: boolean,
        public number?: string,
        public entryId?: number,
    ) {
        this.internal = false;
        this.external = false;
    }
}
