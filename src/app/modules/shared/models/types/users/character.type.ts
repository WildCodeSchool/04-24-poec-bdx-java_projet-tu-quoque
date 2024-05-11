import { CharacterStatus } from '../../enums/character-status.enum';

export type Character = {
  id: number;
  name: string;
  user_Id: number;
  table_Id: number;
  characterAvatar: string;
  characterSheet: number;
  status: CharacterStatus; //enum
  schedule_Id: number;
};
