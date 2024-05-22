import {Game} from "../../domain/models/game";

import {StatisticsService} from "../../domain/services/statistics.service";
import {Injectable} from "@nestjs/common";

@Injectable()
export class DefaultGameView {
    constructor(private readonly statisticsService: StatisticsService) {}

    private chunkArray(game: Game) {
        const result = [];
        for (let i = 0; i < game.boardState()['_area'].length; i += 3) {
            const chunk = game.boardState()['_area'].slice(i, i + 3).map(field => field._sign)
            result.push(chunk);
        }
        return result;
    }

    async getData(game: Game) {
        const statisticsData = await this.statisticsService.getStatistics()
        return {
            id: game.id,
            board: this.chunkArray(game),
            score: statisticsData,
            currentTurn: game.currentTurn(),
            victory: game.getState()
        }
    }
}