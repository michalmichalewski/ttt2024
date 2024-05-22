import {GameFileRepository} from "./GameFileRepository";
import {GameService} from "../../domain/services/GameService";
import {GameFactory} from "../../domain/factories/GameFactory";
import {Test, TestingModule} from "@nestjs/testing";

describe('Game repository', ( () => {

    let gameRepository: GameFileRepository;
    let gameService: GameService;

    beforeAll(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [],
            providers: [GameService, GameFileRepository],
        }).compile();

        gameRepository = app.get<GameFileRepository>(GameFileRepository);
    })

    afterEach(async () => {
        await gameRepository.clearOngoingGames()
    })

    it('should find currently played game file', async () => {
        const game = GameFactory.createNewGame()
        await gameRepository.persistGame(game)
        const ongoingGame = await gameRepository.findOngoingGame()

        expect(game.id).toBe(ongoingGame.id)
    })

    it('should make only one game possible to play at the time', async () => {
        const game = GameFactory.createNewGame()
        await gameRepository.persistGame(game)
        const ongoingGame = await gameRepository.findOngoingGame()

        const secondGame = GameFactory.createNewGame();

        await expect(gameRepository.persistGame(secondGame)).rejects.toThrow('Cannot persist game, game is not ongoing')
    })
}))