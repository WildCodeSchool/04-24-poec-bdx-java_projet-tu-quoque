import { Character } from "./character.type";
import { Note } from "./note.type";


export type User = {
    "id": number,
    "userName": string,
    "password": string,
    "avatar": string,
    "characters": Character[],
    "notes": Note[]
}