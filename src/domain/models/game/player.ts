import {Sign} from "./sign";
import {Game} from "../game";
import {Move} from "../valueObject/move";

export class Player {
    piece: Sign;
    game: Game | undefined;

    constructor(sign: Sign) {
        this.piece = sign
    }

    joinGame(game: Game): void {

        if (this.game !== undefined) {
            throw new Error(`You're in the game!`);
        }

        game.join(this);
        this.game = game;
    }

    isOwnerOf(sign: Sign) {
        return this.piece === sign;
    }

    makeMove(move: Move): void {
        if (this.game === undefined) {
            throw new Error(`Player didn't join the game`);
        }

        this.game.makeMove(move);
    }

    giveUp() {
        throw new Error('Unsupported method');
    }
}