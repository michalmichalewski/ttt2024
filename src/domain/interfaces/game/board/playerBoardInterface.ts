import {Move} from "../../../models/valueObject/move";
import {Sign} from "../../../models/game/sign";
export interface PlayerBoardInterface {
    registerAction(action: Move, sign: Sign): void;
    getSignByIndex(index: number): Sign;
    hasAnySpaceLeft(): boolean;
    runOutOfSpace(): boolean;
    size(): number;
}