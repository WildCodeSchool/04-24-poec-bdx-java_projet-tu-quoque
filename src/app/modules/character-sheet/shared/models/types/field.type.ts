import { BasicField } from "./basic-field.type";
import { PurseField } from "./purse-field.type";
import { SkillField } from "./skill-field.type";
import { StatField } from "./stat-field.type";
import { StatListField } from "./stat-list-field.type";
import { WeaponField } from "./weapon-field.type";

export type Field = SkillField | StatField | BasicField | StatListField | PurseField | WeaponField;