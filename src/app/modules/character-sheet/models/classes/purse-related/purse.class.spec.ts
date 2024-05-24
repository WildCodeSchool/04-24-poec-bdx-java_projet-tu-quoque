import { Purse } from "./purse.class"

describe("test purse", () => {
    let purse = new Purse();

    it('should parse 2pc in [0, 0, 2]', () => {
        expect(purse.convert('2pc')).toEqual([0, 0, 2]);
    });
    it('should parse 2po21pc in [2, 0, 21]', () => {
        expect(purse.convert('2po21pc')).toEqual([2, 0, 21]);
    });
    it('should parse 3 PO, 5 PA, 6 PC in [3, 5, 6]', () => {
        expect(purse.convert('3 PO, 5 PA, 6 PC')).toEqual([3, 5, 6]);
    });
    it('should parse 5 PA, 6 PC, 3 PO in [3, 5, 6]', () => {
        expect(purse.convert('5 PA, 6 PC, 3 PO')).toEqual([3, 5, 6]);
    });
    it('should parse ', () => {
        expect(purse.convert('50 Pc, 3 PO, 6 Pa')).toEqual([3, 6, 50]);
    });

    it('should a 1po purse > 1pc purse', () => {
        expect(new Purse('1po') > new Purse('1pc')).toBeTrue();
    });
    it('should a 1po purse < 10po purse', () => {
        expect(new Purse('1po') < new Purse('10po')).toBeTrue();
    });

    it('should be 3po 50 pa if i have got 3po and i gain 50pa', () => {
        let purse = new Purse('3po');
        purse.gain('50pa');
        expect(purse.toString()).toEqual('3po 50pa');
    });
    it('should be 4po if i have got 3po 50 pa and i gain 50pa', () => {
        let purse = new Purse('3po 50pa');
        purse.gain('50pa');
        expect(purse.toString()).toEqual('4po');
    });

    it('should be 3po 50 pa if i have got 3po 95 pa and i spend 45pa', () => {
        let purse = new Purse('3po 95pa');
        purse.debt('45pa');
        expect(purse.toString()).toEqual('3po 50pa');
    });
    it('should be 2po 55pa if i have got 3po 50 pa and i spend 95pa', () => {
        let purse = new Purse('3po 50pa');
        purse.debt('95pa');
        expect(purse.toString()).toEqual('2po 55pa');
    });
})
