import {Game} from "../../domain/models/game";
import {GameId} from "../../domain/models/valueObject/gameId";
import {GameDataInterface} from "../../domain/interfaces/game/GameDataInterface";

export interface GameRepositoryInterface {
    findGameById(id: GameId): Promise<Game|{}>;
    findOngoingGame(): Promise<Game|{}>;
    persistGame(game: Game): Promise<void>;
}