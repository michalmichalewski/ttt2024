import {Injectable} from "@nestjs/common";
import {StatisticsRepository} from "../../infractructure/repositories/statistics.repository";
import {Sign} from "../models/game/sign";

export interface StatisticsInterface {
    [Sign.x]: number;
    [Sign.o]: number;
}

@Injectable()
export class StatisticsService {

    constructor(private readonly repository: StatisticsRepository) {}

    getStatistics(): Promise<StatisticsInterface> {
        return this.repository.getStatistics()
    }

    async addWinningPointsTo(sign: Sign) {
        const data = await this.getStatistics()
        data[sign] += 1
        return this.repository.persist(data)
    }

    async clearStatistics() {
        return this.repository.persist({
            [Sign.x]: 0,
            [Sign.o]: 0
        })
    }
}