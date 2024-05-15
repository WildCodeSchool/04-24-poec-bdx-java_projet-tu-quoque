import { CharacterStatus } from '../../enums/character-status.enum';

export type Character = {
  id: number;
  name: string;
  user_id: number;
  table_id?: number;
  avatar: string;
  characterSheet: number;
  accepted: boolean; //enum
  schedule_id: number;
};
