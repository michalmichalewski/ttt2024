import {Sign} from "../sign";
import {PieceOccupiedException} from "../../../exceptions/piece-occupied.exception";

export class Piece {
    private _sign: Sign

    constructor(sign: Sign) {
        this._sign = sign;
    }

    setSign(sign: Sign) {
        if(this.isNotAvailable()) {
            throw new PieceOccupiedException('Cannot place piece in current field. Field has value');
        }

        this._sign = sign;
    }

    get sign(): Sign {
        return this._sign;
    }

    isAvailable(): boolean {
        return this._sign === Sign.n;
    }

    isNotAvailable(): boolean {
        return !this.isAvailable();
    }
}