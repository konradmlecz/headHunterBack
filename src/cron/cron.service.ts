import { Injectable } from '@nestjs/common';
import {Cron, CronExpression} from "@nestjs/schedule";

@Injectable()
export class CronService {

    // @Cron(CronExpression.EVERY_5_SECONDS)
    // hello(){
    //     console.log('Hi');
    // }
}
