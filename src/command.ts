import { NestFactory } from "@nestjs/core";
import { Week1Service } from "./modules/week1/week1.service";
import { initializeTransactionalContext } from "typeorm-transactional";
import { CommandModule } from "./command.module";
import minimist from "minimist";
import { getRandomInt } from "./modules/week1/utils/random.util";
import AppLog from "./logger/app-log.service";
import { Week2Service } from "./modules/week2/week2.service";
import { Week3Service } from "./modules/week3/week3.service";
import { Transport } from "@nestjs/microservices";
import { BROKER_URL, QUEUE_NAME } from "./modules/week3/const/const";
import { UsersService } from "./modules/week8/users/users.service";
import { SensorDataService } from "./modules/week8/sensor-data/sensor-data.service";

async function bootstrap() {
    initializeTransactionalContext();
    const app = await NestFactory.createApplicationContext(CommandModule, {
        logger: false,
    });

    const cmd = process.argv[2];
    const args = minimist(process.argv.slice(2));
    if (!cmd) return app.close();

    switch (cmd) {
        case 'week1': {
            const subtask = args.task;
            const week1Runner = app.get(Week1Service);

            switch (subtask) {
                case 'urlencoded': {
                    const [field1Url, field2Url] = getRandomInt(0, 100);
                    const urlEncodedResponse = await week1Runner.sendDataUrlEncoded(field1Url, field2Url);
                    break;
                }
                case 'jsonencoded': {
                    const [field1Json, field2Json] = getRandomInt(0, 100);
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
            break;
        }
        case 'week3': {
            const mode = args.mode;
            switch (mode) {
                case 'send': {
                    const sender = app.get(Week3Service);
                    await sender.initialize();
                    setInterval(() => sender.send(), 5000); // send data every 5s
                    break;
                }

                case 'receive': {
                    await app.close();
                    const receiver = await NestFactory.createMicroservice(
                        CommandModule,
                        {
                            transport: Transport.RMQ,
                            options: {
                                urls: [BROKER_URL],
                                queue: QUEUE_NAME,
                                queueOptions: { durable: false },
                            },
                        },
                    );

                    await receiver.listen();
                    AppLog.info(
                        `[WEEK 3][RECEIVER] Microservice is listening on queue ${QUEUE_NAME}`,
                    );
                    break;
                }

                default:
                    AppLog.warn('Unknown or missing command');
                    break;
            }
            break;
        }
        case 'week8': {
            const task = args.task;

            const usersService = app.get(UsersService);
            const sensorService = app.get(SensorDataService);

            switch (task) {
                case 'list-users': {
                    const users = await usersService.findAll();
                    console.log('Users:', users);
                    break;
                }

                case 'create-user': {
                    const name = args.name || 'random_user';
                    const email = args.email || 'admin@host.com';
                    const password = args.password || '123qwe!@#';

                    const user = await usersService.create({
                        username: name,
                        password: password,
                        email: email,
                    });

                    console.log('Created user:', user);
                    break;
                }

                case 'update-user': {
                    const id = args.id;
                    if (!id) {
                        console.log('Missing --id');
                        break;
                    }

                    const updated = await usersService.update(id, {
                        username: args.name,
                        password: args.password,
                        email: args.email,
                    });

                    console.log('Updated:', updated);
                    break;
                }

                case 'delete-user': {
                    const id = args.id;
                    if (!id) {
                        console.log('Missing --id');
                        break;
                    }

                    const del = await usersService.delete(id);
                    console.log('Deleted:', del);
                    break;
                }

                case 'list-sensors': {
                    const sensors = await sensorService.findAll();
                    console.log('Sensor data:', sensors);
                    break;
                }

                case 'add-sensor': {
                    const name = args.name || 'random sensor_' + Date.now();
                    const value = parseFloat(args.value || 0);

                    const sensor = await sensorService.create({
                        sensorName: name,
                        sensorValue: value,
                    });

                    console.log('Created sensor data:', sensor);
                    break;
                }

                case 'update-sensor': {
                    const id = args.id;
                    if (!id) {
                        console.log('Missing --id');
                        break;
                    }

                    const updatedSensor = await sensorService.update(id, {
                        sensorName: args.name,
                        sensorValue: args.value,
                    });

                    console.log('Updated sensor:', updatedSensor);
                    break;
                }

                case 'delete-sensor': {
                    const id = args.id;
                    if (!id) {
                        console.log('Missing --id');
                        break;
                    }

                    const deletedSensor = await sensorService.delete(id);
                    console.log('Deleted sensor:', deletedSensor);
                    break;
                }

                default:
                    console.log('Unknown or missing task for week8');
                    break;
            }

            break;
        }

        default:
            console.log(`Unknown command: ${cmd}`);
            break;
    }
};

bootstrap();

