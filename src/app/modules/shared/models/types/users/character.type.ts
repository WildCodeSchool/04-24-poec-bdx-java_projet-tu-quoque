import { CharacterStatus } from '../../enums/character-status.enum';

export type Character = {
  id: number;
  name: string;
  userId: number;
  tableId?: number;
  avatar: string;
  characterSheetId?: number;
  accepted: boolean;
  scheduleId?: number;
};
