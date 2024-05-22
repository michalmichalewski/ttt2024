import {Players} from "./players";
import {PlayerFactory} from "../../factories/PlayerFactory";
import {Player} from "./player";

describe('Players collection', () => {
    it('should be defined', function () {
        expect(Players).toBeDefined();
    });
    it('should return next undefined as next player', function () {
        const players = new Players();
        expect(players.nextPlayer()).toBe(undefined);
    });

    it('should return next player', function () {
        const players = new Players();
        players.add(PlayerFactory.createXPlayer());
        players.add(PlayerFactory.createOPlayer());

        expect(players.nextPlayer()).toBeInstanceOf(Player);
    });
});