import {PlayerBoardInterface} from "./board/playerBoardInterface";
import {GameState} from "../../models/game/gameState";

export interface GameStateInterface {
    boardState(): PlayerBoardInterface;
    setState(state: GameState): void;
}