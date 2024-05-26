import { Purse } from "./purse.class";

export class PurseFactory {
    static createInitialPurse(amount: number) {
        return new Purse(`${amount} po`);
    }
}