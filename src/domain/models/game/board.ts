import {Piece} from "./board/piece";
import {Move} from "../valueObject/move";
import {Sign} from "./sign";
import {PlayerBoardInterface} from "../../interfaces/game/board/playerBoardInterface";

export class Board implements PlayerBoardInterface
{
    private _area: Piece[] = [];

    constructor(numberOfItems = 9) {
        for (let i = 0; i < numberOfItems; i++) {
            this._area.push(new Piece(Sign.n));
        }
    }

    registerAction(move: Move) {
        const field = this._area[move.index];
        if(field === undefined) {
            throw new Error(`Cannot place a move. Area[${move.index}] does not exists`);
        }
        field.setSign(move.sign);
    }

    /**
     * @todo refactor this, check index alternative
     * @param index
     */
    getSignByIndex(index: number): Sign {
        const field = this._area[index];

        if (!field) {
            throw new Error(`Cannot place a move. Area[${index}] does not exists`);
        }

        return this._area[index].sign as Sign;
    }

    hasAnySpaceLeft(): boolean {
        return this._area.filter(field => field.sign === Sign.n).length > 0;
    }

    runOutOfSpace(): boolean {
        return this.hasAnySpaceLeft() === false;
    }

    set area(fields: Piece[]) {
        this._area = fields;
    }

    size(): number {
        return this._area.length;
    }
}