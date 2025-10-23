import { Module } from "@nestjs/common";
import { Week1Module } from "./week1/week1.module";
import { Week2Module } from "./week2/week2.module";

@Module({
    imports: [
        Week1Module,
        Week2Module,
    ],
    providers: [],
})
export class CommandModule {}