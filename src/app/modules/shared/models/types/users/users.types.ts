import { Characters } from "./characters.type";
import { Notes } from "./notes.type";
import { PersonalInfos } from "./personalInfos.type"

export type Users = {
    personalInfos: PersonalInfos[];
    characters: Characters[];
    notes: Notes[]
}