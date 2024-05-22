import {GameRepositoryInterface} from "./GameRepositoryInterface";
import {Game} from "../../domain/models/game";
import {GameId} from "../../domain/models/valueObject/gameId";
import {GameFactory} from "../../domain/factories/GameFactory";
import {Board} from "../../domain/models/game/board";
import {GameState} from "../../domain/models/game/gameState";
import {Injectable} from "@nestjs/common";

require("json-circular-stringify");

@Injectable()
export class GameFileRepository implements GameRepositoryInterface {

    private fs = require('fs');
    private readonly dbPath = `${__dirname}/../../../var/db/`;

    gameStatePath(gameId: string) {
        return `${this.dbPath}${gameId}.json`
    }

    archivedGamePath(gameId: string) {
        return `${this.dbPath}/archive/${gameId}`
    }

    async findGameById(id: GameId): Promise<Game> {
        const fileContents = await this.readFileContent(id);
        const gameData = JSON.parse(fileContents) as any;

        return GameFactory.createGameFromState(
            gameData._id.value,
            gameData.board as Board,
            gameData.state as GameState,
            gameData.players.players,
            gameData.players.currentPlayerIndex
        );
    }

    archiveGame(game: Game) {
        return new Promise((resolve, reject) => {
            this.fs.rename(this.gameStatePath(game.id), this.archivedGamePath(game.id), () => {
                resolve(true)
            })
        })
    }

    private findAll(): Promise<string[]> {
        return new Promise(resolve => {
            this.fs.readdir(this.dbPath, (err: any, files: any) => {
                if(err) {
                    throw new Error('Cannot read database')
                }

                return resolve(files.filter(file => {
                    return file.includes('.json')
                }));
            })
        })
    }

    private readFileContent(id: GameId): Promise<string> {
        return new Promise((resolve, reject) => {
            this.fs.readFile(this.gameStatePath(id.toString()), "utf-8", (err: string | undefined, data: any) => {
                if (err) {
                    reject(err);
                }

                resolve(data);
            });
        });
    }

    async persistGame(game: Game): Promise<void> {

        // @TODO: This should be in service not here
        const ongoingGame = await this.findOngoingGame()
        if(ongoingGame && ongoingGame.is(game) === false) {
            throw new Error('Cannot persist game, game is not ongoing')
        }

        return new Promise( (resolve, reject) => {
            this.fs.writeFile(`${this.dbPath}${game.id}.json`,JSON.stringify(game), function(err: any) {
                if(err) {
                    reject(err);
                }

                return resolve()
            });
        })
    }

    async findOngoingGame(): Promise<Game | null> {
        const games = await this.findAll()

        if(games.length === 0) {
            return null;
        }

        const gameId = games[0].split('.')[0]; // get fileName which is id
        return this.findGameById(new GameId(gameId))
    }

    async clearOngoingGames(): Promise<void> {
        const files = await this.findAll();

        files.forEach(file => {

            const gameId = file.split('.')[0];
            if(!gameId) {
                throw new Error('Cannot find game id to delete');
            }

            const filePath = this.gameStatePath(gameId)
            this.fs.unlinkSync(filePath);
        });
    }
}