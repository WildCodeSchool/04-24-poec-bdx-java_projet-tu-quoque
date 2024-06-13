import { StatisticDTO } from "./statistic-dto.type"

export type StatisticsDTO = {
    id: number,
    FOR: StatisticDTO,
    DEX: StatisticDTO,
    CON: StatisticDTO,
    INT: StatisticDTO,
    SAG: StatisticDTO,
    CHA: StatisticDTO
}
