import { CharacterDTO } from "./character-dto";
import { NoteShortDTO } from "./note-short-dto";
import { GameTableDTO } from "./table-dto";


export type UserInfos = {
    id: number;
    name: string;
    avatar: string;
    role: string;
    playerCharacterList: CharacterDTO[];
    playerNoteList: NoteShortDTO[];
    game_tables: number[];
    playerGameTableList: GameTableDTO[],
    gameTableInvitationList: GameTableDTO[] 
  };
  