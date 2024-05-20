import { AttackBaseBonusService } from './attack-base-bonus.service';
import { AttackBaseBonusType } from '../../models/enums/attack-base-bonus-type.enum';

describe('AttackBaseBonusService', () => {
  it('should be 6-1 for high level bba and level 6', () => {
    expect(AttackBaseBonusService.getValue(6, AttackBaseBonusType.high)).toEqual([6, 1]);
  });
  it('should be 18-13-8-3 for high level bba and level 18', () => {
    expect(AttackBaseBonusService.getValue(18, AttackBaseBonusType.high)).toEqual([18, 13, 8, 3]);
  });
  it('should be 1 for high level bba and level 1', () => {
    expect(AttackBaseBonusService.getValue(1, AttackBaseBonusType.high)).toEqual([1]);
  });

  it('should be 3 for low level bba and level 6', () => {
    expect(AttackBaseBonusService.getValue(6, AttackBaseBonusType.low)).toEqual([3]);
  });
  it('should be 9-4 for low level bba and level 18', () => {
    expect(AttackBaseBonusService.getValue(18, AttackBaseBonusType.low)).toEqual([9, 4]);
  });
  it('should be 5 for low level bba and level 11', () => {
    expect(AttackBaseBonusService.getValue(11, AttackBaseBonusType.low)).toEqual([5]);
  });
  it('should be 6-1 for low level bba and level 12', () => {
    expect(AttackBaseBonusService.getValue(12, AttackBaseBonusType.low)).toEqual([6, 1]);
  });
  it('should be 0 for low level bba and level 1', () => {
    expect(AttackBaseBonusService.getValue(1, AttackBaseBonusType.low)).toEqual([0]);
  });

  it('should be 4 for medium level bba and level 6', () => {
    expect(AttackBaseBonusService.getValue(6, AttackBaseBonusType.medium)).toEqual([4]);
  });
  it('should be 13-8-3 for medium level bba and level 18', () => {
    expect(AttackBaseBonusService.getValue(18, AttackBaseBonusType.medium)).toEqual([13, 8, 3]);
  });
  it('should be 8-3 for medium level bba and level 11', () => {
    expect(AttackBaseBonusService.getValue(11, AttackBaseBonusType.medium)).toEqual([8, 3]);
  });
  it('should be 9-4 for medium level bba and level 12', () => {
    expect(AttackBaseBonusService.getValue(12, AttackBaseBonusType.medium)).toEqual([9, 4]);
  });
  it('should be 0 for medium level bba and level 1', () => {
    expect(AttackBaseBonusService.getValue(1, AttackBaseBonusType.medium)).toEqual([0]);
  });
});
