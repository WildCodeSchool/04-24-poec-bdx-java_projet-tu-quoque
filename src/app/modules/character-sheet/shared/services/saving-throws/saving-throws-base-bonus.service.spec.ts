import { SavingThrowsBaseBonusService } from './saving-throws-base-bonus.service';
import { SavingThrowType } from '../../../models/enums/saving-throws-type.enum';

describe('SavingThrowsService', () => {
  it("should be 5 for high saving throw and level 6", () => {
    expect(SavingThrowsBaseBonusService.getValue(6, SavingThrowType.high)).toBe(5);
  })
  it("should be 11 for high saving throw and level 19", () => {
    expect(SavingThrowsBaseBonusService.getValue(19, SavingThrowType.high)).toBe(11);
  })
  it("should be 2 for low saving throw and level 6", () => {
    expect(SavingThrowsBaseBonusService.getValue(6, SavingThrowType.low)).toBe(2);
  })
  it("should be 6 for low saving throw and level 20", () => {
    expect(SavingThrowsBaseBonusService.getValue(20, SavingThrowType.low)).toBe(6);
  })
});
