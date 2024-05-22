import {Game} from "../models/game";
import {GameId} from "../models/valueObject/gameId";
import {GameFactory} from "../factories/GameFactory";
import {HttpException, Injectable} from "@nestjs/common";
import {GameFileRepository} from "../../infractructure/repositories/GameFileRepository";
import {Move} from "../models/valueObject/move";
import {GameProgressListener} from "../listener/GameProgressListener";
import {StatisticsService} from "./statistics.service";

@Injectable()
export class GameService {

    constructor(
        private readonly gameRepository: GameFileRepository,
        private readonly gameProgressListener: GameProgressListener,
        private readonly statisticService: StatisticsService
    ) {}

    createNewGame() {
        return GameFactory.createNewGame();
    }

    async findGameById(id: GameId) {
        let game = await this.gameRepository.findGameById(id);
        if (game === null) {
            throw new HttpException('Not found', 404);
        }
        return game;
    }

    async makeAMove(game: Game, move: Move) {
        const player = game.getPlayerByPiece(move.sign);
        player.makeMove(move);
    }

    findOngoingGame() {
        return this.gameRepository.findOngoingGame()
    }

    persistState(game: Game)  {
        return this.gameRepository.persistGame(game);
    }

    async restart() {
        const ongoingGame = await this.gameRepository.findOngoingGame()
        await this.gameProgressListener.observeGameState(ongoingGame);
        await this.gameRepository.archiveGame(ongoingGame)

        const newGame = GameFactory.createNewGame()
        await this.gameRepository.persistGame(newGame)
        return newGame
    }

    async clearGame() {
        const [game,stats] = await Promise.all([
            this.restart(),
            this.statisticService.clearStatistics()
        ])

        return game
    }
}