import {Test, TestingModule} from "@nestjs/testing";
import {AppService} from "../../app.service";
import {GameService} from "./GameService";
import {GameFileRepository} from "../../infractructure/repositories/GameFileRepository";
import {Game} from "../models/game";

describe('GameService', () => {

    let service: GameService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [AppService, GameService, GameFileRepository],
        }).compile();

        service = module.get<GameService>(GameService);
    });

    it('->createNewGame should return new game', function () {
        expect(service).toBeDefined();
    });

    describe('createNewGame method', () => {
        it('should return new game', function () {
            const game = service.createNewGame();
            expect(game).toBeInstanceOf(Game);
        });

        it('should return different id values for each call', function () {
            const firstGame = service.createNewGame();
            const secondGame = service.createNewGame();

            expect(firstGame.id).not.toBe(secondGame.id);
        });
    });
});