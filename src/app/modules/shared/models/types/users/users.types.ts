import { Characters } from "./characters.type";
import { Notes } from "./notes.type";


export type Users = {
    "id": number,
    "userName": string,
    "password": string,
    "avatar": string,
    "characters": Characters[],
    "notes": Notes[]
}