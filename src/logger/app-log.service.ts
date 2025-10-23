import { Injectable } from "@nestjs/common";
import chalk from "chalk";

@Injectable()
export default class AppLogService {
    constructor() {}

    public static info(message: string, context?: string) {
        console.log(
            chalk.green(`[INFO]`) +
            (context ? `[${context}]` : '') +
            ` ${message}`,
        );
    }

    public static warn(message: string, context?: string) {
        console.log(
            chalk.yellow(`[WARN]`) +
            (context ? `[${context}]` : '') +
            ` ${message}`,
        );
    }

    public static error(message: string, trace?: any, context?: string) {
        console.log(
            chalk.red(`[ERROR]`) +
            (context ? `[${context}]` : '') +
            ` ${message}`,
        );
        if (trace) console.error(trace);
    }

    public static debug(message: string, context?: string) {
        console.log(
            chalk.yellow(`[DEBUG]`) +
            (context ? `[${context}]` : '') +
            ` ${message}`,
        );
    }
}