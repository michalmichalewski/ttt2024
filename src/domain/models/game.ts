import {Board} from "./game/board";
import {Player} from "./game/player";
import {GameState} from "./game/gameState";
import {GameId} from "./valueObject/gameId";
import {Move} from "./valueObject/move";
import {Players} from "./game/players";
import {PlayerBoardInterface} from "../interfaces/game/board/playerBoardInterface";
import {Sign} from "./game/sign";
import {GameStateInterface} from "../interfaces/game/GameStateInterface";
import {PlayerCheatingException} from "../exceptions/player-cheating.exception";

export class Game implements GameStateInterface {
    private _id: GameId;
    private readonly board: Board;

    private players: Players;
    private state: GameState

    private finishedStates = [GameState.TIE, GameState.O_WIN, GameState.X_WIN];

    constructor(
        id: GameId,
        board: Board,
        state: GameState,
        players: Players,
    ) {
        this._id = id;
        this.board = board;
        this.state = state;
        this.players = players
    }

    get id() {
        return this._id.toString();
    }

    is(game: Game) {
        return this.id === game.id;
    }

    join(player: Player): boolean {
        this.players.add(player);
        return true;
    }

    getPlayerByPiece(sign: Sign): Player {
        return this.players.findByPiece(sign);
    }

    boardState(): PlayerBoardInterface {
        return this.board;
    }

    currentTurn() {
        return this.players.currentPlayer().piece
    }

    makeMove(move: Move) {
        if(this.isFinished(this.state)) {
            throw new Error('Cannot make move. Game finished');
        }
        if(!this.players.canCurrentPlayerMakeAMove(move.sign)) {
            throw new PlayerCheatingException('It is not your turn');
        }

        if(this.players.nextPlayer() === undefined) {
            throw new Error('You cannot play alone');
        }

        this.board.registerAction(move);
        this.setState(GameState.IN_PROGRESS);
        this.players.changeCurrentPlayer();
    }

    isFinished(state: GameState): boolean {
        return this.finishedStates.includes(state);
    }

    setState(state: GameState) {
        this.state = state;
    }

    getState() {
        return this.state;
    }

}