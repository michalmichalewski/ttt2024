import {Sign} from "../game/sign";

export class Verdict {

    private readonly state = {
        [Sign.o] : 0,
        [Sign.x] : 0
    };

    constructor(state?: { o: number; x: number; }) {

        if (state !== undefined) {
            this.state = {...state};
        }
    }

    addCount(sign: Sign): Verdict {
        if (sign !== Sign.n) {
            const next = {...this.state};
            next[sign] += 1;
            return new Verdict(next);
        }

        return this;
    }

    isWinner(): Sign | undefined {
        if (this.state[Sign.x] === 3) {
            return Sign.x;
        }

        if (this.state[Sign.o] === 3) {
            return Sign.o;
        }
    }
}