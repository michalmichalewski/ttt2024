import {Game} from "../models/game";
import {Board} from "../models/game/board";
import {GameState} from "../models/game/gameState";
import {GameId} from "../models/valueObject/gameId";
import {Player} from "../models/game/player";
import {Piece} from "../models/game/board/piece";
import {Sign} from "../models/game/sign";
import {Players} from "../models/game/players";
import {PlayerFactory} from "./PlayerFactory";

export class GameFactory {

    static createGameWithoutPlayers(boardSize: number = 9)
    {
        return new Game(
            new GameId(),
            new Board(boardSize),
            GameState.NEW,
            new Players()
        );
    }

    static createNewGame(startWithPlayer?: Player): Game {

        const players = new Players()

        if(startWithPlayer && startWithPlayer.piece === Sign.o) {
            players.add(PlayerFactory.createOPlayer())
            players.add(PlayerFactory.createXPlayer())
        } else {
            players.add(PlayerFactory.createXPlayer())
            players.add(PlayerFactory.createOPlayer())

        }

        return new Game(
            new GameId(),
            new Board(9),
            GameState.NEW,
            players
        );
    }

    static createGameFromState(
        id: string,
        inputBoard: any,
        state: GameState,
        players: Array<Player>,
        currentPlayerIndex: number
    ): Game {
        const board = new Board();
        board.area = inputBoard._area.map((field: { _sign: Sign; }) => {
            return new Piece(field._sign);
        })

        const game = new Game(
            new GameId(id),
            board,
            state,
            new Players(currentPlayerIndex)
        );

        players.map(_player => {
            const player = new Player(_player.piece);
            player.joinGame(game);
        })

        return game;
    }
}