import {Test, TestingModule} from "@nestjs/testing";
import {StatisticsService} from "./statistics.service";
import {StatisticsRepository} from "../../infractructure/repositories/statistics.repository";
import {Piece} from "../models/game/piece";

describe('statistics repository', () => {

    let service:StatisticsService;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [StatisticsService, StatisticsRepository],
        }).compile();

        service = await module.resolve<StatisticsService>(StatisticsService);
    });

    beforeEach(async () => {
        await service.clearStatistics()
    })

    it('should return statistics object', () => {
        const statistics = service.getStatistics()
    })

    it('should write statistics to file', async () => {
        const aaa = await service.getStatistics()
        await service.addWinningPointsTo(Piece.x)
        const afterSave = await service.getStatistics()
        expect(afterSave).toEqual({x: 1, o: 0})
    })
})