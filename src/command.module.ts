import { Module } from "@nestjs/common";
import { Week1Module } from "./modules/week1/week1.module";
import { Week2Module } from "./modules/week2/week2.module";
import { Week3Module } from "./modules/week3/week3.module";

@Module({
    imports: [
        Week1Module,
        Week2Module,
        Week3Module,
    ],
    providers: [],
})
export class CommandModule {}