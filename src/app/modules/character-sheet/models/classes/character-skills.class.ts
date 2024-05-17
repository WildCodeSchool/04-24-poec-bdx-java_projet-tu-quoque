import { map, Observable, shareReplay, switchMap } from "rxjs";
import { DbService } from "../../../shared/services/db-service/db.service";
import { SkillDetails } from "./skill-details.class";
import { SkillFromDb } from "../types/skill-from-db.type";
import { CharacterSheetService } from "../../shared/services/character-sheet.service";
import { Race } from "../types/race.type";
import { CharacterClass } from "../types/character-class.type";
import { StatisticDetails } from "./statistic-details.class";


