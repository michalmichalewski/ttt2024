import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {GameService} from "./domain/services/GameService";
import {GameFileRepository} from "./infractructure/repositories/GameFileRepository";
import {GameProgressListener} from "./domain/listener/GameProgressListener";
import {StatisticsService} from "./domain/services/statistics.service";
import {StatisticsRepository} from "./infractructure/repositories/statistics.repository";
import {DefaultGameView} from "./application/view/default-game.view";

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, GameService, GameFileRepository, GameProgressListener, StatisticsService, StatisticsRepository, DefaultGameView],
})
export class AppModule {}
