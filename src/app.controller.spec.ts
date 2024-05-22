import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {GameService} from "./domain/services/GameService";
import {GameFileRepository} from "./infractructure/repositories/GameFileRepository";
import {Sign} from "./domain/models/game/sign";
import {HttpException} from "@nestjs/common";

describe('AppController', () => {
  let appController: AppController;
  let repository: GameFileRepository;

  beforeAll(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService, GameService, GameFileRepository],
    }).compile();

    appController = app.get<AppController>(AppController);
    repository = new GameFileRepository()
  });


  describe('GET',() => {

    it('should respond with the game object', async () => {
      const response = await appController.index()
      const secondResponse = await appController.index()

      expect(response).toBeInstanceOf(Object)
      expect(secondResponse).toBeInstanceOf(Object)
      expect(response.id).toEqual(secondResponse.id)
    })

    afterAll(async () => {
      await repository.clearOngoingGames()
    })
  })

  describe('[POST] /piece', () => {

    beforeAll(async () => {
      const response = await appController.index()
    })

    afterAll(async () => {
      await repository.clearOngoingGames()
    })

    it('should respond with 200 if player can make a move', async () => {
      const move = { x: 0, y: 0 }
      const game= await appController.makeAMove(move, Sign.x)
      console.log(game)
    })

    it('should throw 409 error when board piece is occupied', async () => {
      const move = { x: 0, y: 0 }
      try {
        await appController.makeAMove(move, Sign.o)
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException)
        expect(error.getStatus()).toBe(409)
      }
    })
  })
});
