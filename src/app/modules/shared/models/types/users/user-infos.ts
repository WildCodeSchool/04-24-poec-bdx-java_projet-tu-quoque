import { NoteShortDTO } from "./note-short-dto";
import { TableDTO } from "./table-dto";

export type UserInfos = {
    id: number;
    name: string;
    avatar: string;
    role: string;
    player_characters?: number[];
    playerNoteList: NoteShortDTO[];
    game_tables: number[];
    playerGameTableList: TableDTO[],
    gameTableInvitationList: TableDTO[] 
  };
  