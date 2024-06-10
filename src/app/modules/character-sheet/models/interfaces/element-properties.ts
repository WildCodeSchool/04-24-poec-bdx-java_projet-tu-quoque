import { Purse } from "../classes/purse-related/purse.class";

export interface ElementProperties {
    id?: number;
    userId?: number;
    tableId?: number | string;
    purse?: Purse
}
