import { AttackBaseBonusService } from './attack-base-bonus.service';

describe('AttackBaseBonusService', () => {
  it('should be 6-1 for high level bba and level 6', () => {
    expect(AttackBaseBonusService.getValue(6, "high")).toEqual([6, 1]);
  });
  it('should be 18-13-8-3 for high level bba and level 18', () => {
    expect(AttackBaseBonusService.getValue(18, "high")).toEqual([18, 13, 8, 3]);
  });
  it('should be 1 for high level bba and level 1', () => {
    expect(AttackBaseBonusService.getValue(1, "high")).toEqual([1]);
  });

  it('should be 3 for low level bba and level 6', () => {
    expect(AttackBaseBonusService.getValue(6, "low")).toEqual([3]);
  });
  it('should be 9-4 for low level bba and level 18', () => {
    expect(AttackBaseBonusService.getValue(18, "low")).toEqual([9, 4]);
  });
  it('should be 5 for low level bba and level 11', () => {
    expect(AttackBaseBonusService.getValue(11, "low")).toEqual([5]);
  });
  it('should be 6-1 for low level bba and level 12', () => {
    expect(AttackBaseBonusService.getValue(12, "low")).toEqual([6, 1]);
  });
  it('should be 0 for low level bba and level 1', () => {
    expect(AttackBaseBonusService.getValue(1, "low")).toEqual([0]);
  });

  it('should be 4 for medium level bba and level 6', () => {
    expect(AttackBaseBonusService.getValue(6, "medium")).toEqual([4]);
  });
  it('should be 13-8-3 for medium level bba and level 18', () => {
    expect(AttackBaseBonusService.getValue(18, "medium")).toEqual([13, 8, 3]);
  });
  it('should be 8-3 for medium level bba and level 11', () => {
    expect(AttackBaseBonusService.getValue(11, "medium")).toEqual([8, 3]);
  });
  it('should be 9-4 for medium level bba and level 12', () => {
    expect(AttackBaseBonusService.getValue(12, "medium")).toEqual([9, 4]);
  });
  it('should be 0 for medium level bba and level 1', () => {
    expect(AttackBaseBonusService.getValue(1, "medium")).toEqual([0]);
  });
});
