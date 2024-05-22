import {Player} from "./player";
import {Sign} from "./sign";

export class Players {
    protected players: Player[] = [];
    protected currentPlayerIndex: number;

    constructor(currentPlayerIndex: number = 0) {
        this.currentPlayerIndex = currentPlayerIndex;
    }

    private checkPlayerExists(player: Player): boolean {
        return this.players.findIndex(existingPlayer => {
            return existingPlayer.piece === player.piece;
        }) === -1;
    }

    changeCurrentPlayer(): number {
        this.currentPlayerIndex = this.currentPlayerIndex === 0 ? 1 : 0;
        return this.currentPlayerIndex;
    }

    canCurrentPlayerMakeAMove(sign: Sign): boolean {
        const currentPlayer = this.currentPlayer();
        return currentPlayer.isOwnerOf(sign);
    }

    currentPlayer(): Player {
        return this.players[this.currentPlayerIndex];
    }

    nextPlayer(): Player {
        return this.players[(this.currentPlayerIndex + 1) % 2];
    }

    private checkPlayerCanJoin(): boolean {
        return this.players.length <= 2;
    }

    add(player: Player) {
        if(!this.checkPlayerCanJoin()) {
            throw new Error('1#Cannot join the game. Max amount of players');
        }

        if(!this.checkPlayerExists(player)) {
            throw new Error(`2#Cannot join the game. Player with ${player.piece} exists`);
        }

        this.players.push(player);
    }

    findByPiece(sign: Sign): Player  {
        const player = this.players.find(player => player.piece === sign);
        if(player === undefined) {
            throw new Error('Cannot find player');
        }
        return player;
    }
}