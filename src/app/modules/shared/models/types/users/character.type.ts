import { CharacterStatus } from '../../enums/character-status.enum';

export type Character = {
  id: number;
  name: string;
  user_id: number;
  table_id: number;
  characterAvatar: string;
  characterSheet: number;
  status: CharacterStatus; //enum
  schedule_id: number;
};
