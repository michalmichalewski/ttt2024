import {Game} from "../../models/game";
import {Player} from "../../models/game/player";

export interface GameDataInterface {
    game: Game;
    playerX: Player;
    playerO: Player;
}