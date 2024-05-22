import {Game} from "./game";
import {GameFactory} from "../factories/GameFactory";
import {Sign} from "./game/sign";
import {Player} from "./game/player";
import {PlayerFactory} from "../factories/PlayerFactory";
import {Move} from "./valueObject/move";
import {GameState} from "./game/gameState";

describe('Game entity', () => {
    let game: Game;
    beforeAll(() => {
        game = GameFactory.createNewGame();
    });

    describe('getPlayerBySign', () => {
        it('should be defined', function () {
            expect(game.getPlayerByPiece).toBeDefined();
        });

        it('should throw an error when there is not players', function () {
            const game = GameFactory.createGameWithoutPlayers();
            expect(() => game.getPlayerByPiece(Sign.x)).toThrow('Cannot find player');
        });


        it('should return instance of player', function () {
            expect(game.getPlayerByPiece(Sign.x)).toBeInstanceOf(Player);
        });
    });

    describe('boardState', () => {
        it('should be defined', function () {
            expect(game.boardState).toBeDefined();
        });
        it('should should have correct size', function () {
            expect(game.boardState().size()).toBe(9);
        });
    });

    describe('Player', () => {

        it('should be able to join game', function () {
            const game = GameFactory.createGameWithoutPlayers();
            expect(game.join(PlayerFactory.createOPlayer())).toBe(true);
            expect(game.join(PlayerFactory.createXPlayer())).toBe(true);
        });

        it('should not be able to join game', function () {
            expect(() => game.join(PlayerFactory.createXPlayer()))
                .toThrow('2#Cannot join the game. Player with x exists');
        });

        it('should be able to make a move ', function () {
            game.makeMove(new Move(0, Sign.x));
            expect(game.getState()).toBe(GameState.IN_PROGRESS);
            expect(game.boardState().getSignByIndex(0)).toBe(Sign.x);
        });

        it('should not be able to make a move', function () {
            expect(() => {
                const game = GameFactory.createNewGame();
                game.makeMove(new Move(0, Sign.o));
            }).toThrow('It is not your turn');
        });

        it('should not be able to make a move on taken field', function () {
            expect(() => {
                const game = GameFactory.createNewGame();
                game.makeMove(new Move(0, Sign.o));
                game.makeMove(new Move(0, Sign.x));
            }).toThrow('It is not your turn');
        });

        it('should not make a move when only one player', function () {
            expect(() => {
                const game = GameFactory.createGameWithoutPlayers();
                const player = PlayerFactory.createXPlayer()
                player.joinGame(game);
                player.makeMove(new Move(0, Sign.x));
            }).toThrow('You cannot play alone');
        });
    });

});