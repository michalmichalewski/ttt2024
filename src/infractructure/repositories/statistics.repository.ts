import * as fs from 'fs';
import {Sign} from "../../domain/models/game/sign";
import {StatisticsInterface} from "../../domain/services/statistics.service";
import {Injectable} from "@nestjs/common";
import {json} from "express";

@Injectable()
export class StatisticsRepository {
    private readonly dbPath = `${__dirname}/../../../var/db/statistics/`;

    public async getStatistics() {
        try {
            const data = JSON.parse(fs.readFileSync(this.dbPath +'db.json', 'utf8'));
            console.log('Statistics data',data)

            return data
        } catch (error) {
            console.error(error);
            return {
                [Sign.x]: 0,
                [Sign.o]: 0,
            }
        }
    }

    public async persist(statistics: StatisticsInterface): Promise<StatisticsInterface> {
        return new Promise( (resolve, reject) => {
            fs.writeFile(`${this.dbPath}db.json`,JSON.stringify(statistics), function(err: any) {
                if(err) {
                    reject(err);
                }

                return resolve(statistics);
            });
        })
    }
}