import { TestBed } from '@angular/core/testing';

import { SavingThrowsService } from './saving-throws.service';
import { SavingThrowType } from '../../models/enums/saving-throws-type.enum';

describe('SavingThrowsService', () => {
  let service: SavingThrowsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SavingThrowsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it("should be 5 for high saving throw and level 6", () => {
    expect(SavingThrowsService.getValue(6, SavingThrowType.high)).toBe(5);
  })
  it("should be 11 for high saving throw and level 19", () => {
    expect(SavingThrowsService.getValue(19, SavingThrowType.high)).toBe(11);
  })
  it("should be 2 for low saving throw and level 6", () => {
    expect(SavingThrowsService.getValue(6, SavingThrowType.low)).toBe(2);
  })
  it("should be 6 for low saving throw and level 20", () => {
    expect(SavingThrowsService.getValue(20, SavingThrowType.low)).toBe(6);
  })
});
