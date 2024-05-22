import {Player} from "../models/game/player";
import {Sign} from "../models/game/sign";

export class PlayerFactory {
    public static createXPlayer() {
        return new Player(Sign.x);
    }

    public static createOPlayer() {
        return new Player(Sign.o);
    }
}