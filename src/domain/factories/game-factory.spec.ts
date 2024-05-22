import {GameFactory} from "./GameFactory";
import {Game} from "../models/game";
import {GameState} from "../models/game/gameState";
import {Sign} from "../models/game/sign";
import {Player} from "../models/game/player";

describe('Game factory', () => {
    let game: Game;
    beforeAll(() => {
        game = GameFactory.createNewGame();
    })

    describe('methods', () => {
        it('should createGameWithoutPlayers be defined', function () {
            expect(GameFactory.createGameWithoutPlayers).toBeDefined();
        });

        it('should createGameFromState be defined', function () {
            expect(GameFactory.createGameFromState).toBeDefined();
        });
    });

    it('should create new instance of game model', () => {
        expect(game).toBeInstanceOf(Game);
    });

    it('should create new instance with new status', function () {
        expect(game.getState()).toBe(GameState.NEW);
    });

    it('should create game with set of two players', function () {
        expect(game.getPlayerByPiece(Sign.x)).toBeInstanceOf(Player);
        expect(game.getPlayerByPiece(Sign.o)).toBeInstanceOf(Player);
    });
});