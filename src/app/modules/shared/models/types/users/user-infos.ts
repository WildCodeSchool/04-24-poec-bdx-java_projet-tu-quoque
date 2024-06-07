import { TableDTO } from "./table-dto";

export type UserInfos = {
    id: number;
    name: string;
    avatar: string;
    role: string;
    player_characters?: number[];
    notes: number[];
    game_tables: number[];
    playerGameTableList: TableDTO[]
  };
  