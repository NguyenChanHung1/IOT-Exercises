import { randomInt } from "node:crypto";

export function getRandomInt(minv: number, maxv: number) : number[] {
    return [
        randomInt(minv, maxv),
        randomInt(minv, maxv)
    ];
}