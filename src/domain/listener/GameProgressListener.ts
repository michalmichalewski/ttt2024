import {Game} from "../models/game";
import {PlayerBoardInterface} from "../interfaces/game/board/playerBoardInterface";
import {Verdict} from "../models/valueObject/verdict";
import {Sign} from "../models/game/sign";
import {GameState} from "../models/game/gameState";
import {StatisticsService} from "../services/statistics.service";
import {Injectable} from "@nestjs/common";

@Injectable()
export class GameProgressListener {
    constructor(private readonly statisticsService: StatisticsService) {
    }

    private winnerStateMap = {
        [Sign.x] : GameState.X_WIN,
        [Sign.o] : GameState.O_WIN
    }

    async observeGameState(game: Game) {
        const board = game.boardState();

        const winningCombinations = [
            ...this.rowCombinationStrategy(),
            ...this.columnCombinationStrategy(),
            ...this.diagonalCombinationStrategy()
        ];

        for(let combinationNumber = 0; combinationNumber < winningCombinations.length; combinationNumber++) {
            let verdict = this.findAWinner(board,winningCombinations[combinationNumber]);
            const winner = verdict.isWinner();

            if(winner) {
                game.setState(this.winnerStateMap[winner]);
                await this.statisticsService.addWinningPointsTo(winner)
            }
        }

        if(board.runOutOfSpace() && game.getState() === GameState.IN_PROGRESS) {
            game.setState(GameState.TIE);
        }

        return game;
    }

    private findAWinner(board: PlayerBoardInterface, combination: Array<number>) {
        let verdict = new Verdict();

        combination.map(filledIndex => {
            const piece = board.getSignByIndex(filledIndex)
            verdict = verdict.addCount(piece);
        });

        return verdict;
    }

    private rowCombinationStrategy(): Array<any> {
        return [
            [0, 1, 2],
            [3 ,4, 5],
            [6 ,7, 8],
        ]
    }

    private columnCombinationStrategy(): Array<any> {
        return [
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8]
        ];
    }

    private diagonalCombinationStrategy(): Array<any> {
        return [
            [0, 4, 8],
            [2, 4, 6]
        ];
    }
}