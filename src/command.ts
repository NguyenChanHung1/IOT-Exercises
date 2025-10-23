import { NestFactory } from "@nestjs/core";
import { Week1Service } from "./week1/week1.service";
import { initializeTransactionalContext } from "typeorm-transactional";
import { CommandModule } from "./command.module";
import minimist from "minimist";
import { getRandomInt } from "./week1/utils/random.util";
import AppLog from "./logger/app-log.service";
import { Week2Service } from "./week2/week2.service";

async function bootstrap() {
    initializeTransactionalContext();
    const app = await NestFactory.createApplicationContext(CommandModule, {
        logger: false,
    });
    
    const cmd = process.argv[2];
    const args = minimist(process.argv.slice(2));
    if (!cmd) return app.close();

    let shouldCloseApp = true;

    switch (cmd) {
        case 'week1': {
            const subtask = args.task;
            const week1Runner = app.get(Week1Service);

            switch (subtask) {
                case 'urlencoded': {
                    const [ field1Url, field2Url ] = getRandomInt(0, 100);
                    const urlEncodedResponse = await week1Runner.sendDataUrlEncoded(field1Url, field2Url);
                    break;
                }
                case 'jsonencoded': {
                    const [ field1Json, field2Json ] = getRandomInt(0, 100);
                    const jsonPostResponse = await week1Runner.sendDataJson(field1Json, field2Json);
                    break;
                }
                case 'getfeed': {
                    const feedLength = args.feedLength || 2;
                    const feeds = await week1Runner.getDataFromChannel(feedLength);
                    break;
                }
                default: {
                    AppLog.warn('Unknown or missing command');
                    break;
                }
            }
            
            break;
        }
        case 'week2': {
            const week2Runner = app.get(Week2Service);
            week2Runner.initialize();
            shouldCloseApp = false;
            break;
        }
        case 'week3': {
            const week1Runner = app.get(Week1Service);
            
            break;
        }
        case 'week4': {
            const week1Runner = app.get(Week1Service);
            
            break;
        }
        case 'week5': {
            const week1Runner = app.get(Week1Service);
            
            break;
        }
        case 'week6': {
            const week1Runner = app.get(Week1Service);
            
            break;
        }
        case 'week7': {
            const week1Runner = app.get(Week1Service);
            
            break;
        }
        case 'week8': {
            const week1Runner = app.get(Week1Service);
            
            break;
        }
        default:
            console.log(`Unknown command: ${cmd}`);
            break;
    }

    if (shouldCloseApp) {
        AppLog.info(`[WEEK 2] Command finished. Exiting process`);
        await app.close();
        return process.exit(0);
    }
}; 

bootstrap();

