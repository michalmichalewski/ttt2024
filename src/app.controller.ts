import {Body, Controller, Delete, Get, HttpException, Param, Post, Put} from '@nestjs/common';
import {GameService} from "./domain/services/GameService";
import {Game} from "./domain/models/game";
import {PlayerMovement} from "./application/dto/PlayerMovement";
import {MoveFactory} from "./domain/factories/MoveFactory";
import {PieceOccupiedException} from "./domain/exceptions/piece-occupied.exception";
import {DefaultGameView} from "./application/view/default-game.view";
import {PlayerCheatingException} from "./domain/exceptions/player-cheating.exception";

@Controller('')
export class AppController {
  constructor(
      private readonly gameService: GameService,
      private readonly view: DefaultGameView
    ) {}

  // probably endpoint should be GET /game with a description
  @Get('/')
  async index() {
    const game = await this.gameService.findOngoingGame()

    /**
     * Should be seperate endpoint
     */
    if(!game) {
      const game = this.gameService.createNewGame()
      await this.gameService.persistState(game)

      return this.view.getData(game)
    }

    return this.view.getData(game)
  }

  @Get(':id')
  findGameById(@Param() params): Promise<Game> {
    try {
      return this.gameService.findGameById(params.id)
    } catch(err) {
      console.log(err);
    }
  }


  @Post('/restart')
  async reset() {
    const newGame = await this.gameService.restart()
    return this.view.getData(newGame)
  }


  @Post(':piece')
  async makeAMove(@Body() move: PlayerMovement, @Param('sign') sign: string) {
    try {

      const game: Game = await this.gameService.findOngoingGame();
      await this.gameService.makeAMove(game, MoveFactory.createFromDto(move, sign));
      await this.gameService.persistState(game);

      return this.view.getData(game)
    } catch (err) {

      if(err instanceof PieceOccupiedException) {
        throw new HttpException(err.toString(), 409);
      }

      if(err instanceof PlayerCheatingException) {
        throw new HttpException(err.toString(), 406);
      }

      throw new HttpException(err.toString(), 400);
    }
  }

  @Delete()
  async startOver() {
    const game = await this.gameService.clearGame()
    return {
      currentTurn: game.currentTurn()
    }
  }
}
