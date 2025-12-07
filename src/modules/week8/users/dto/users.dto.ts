import { ApiProperty } from "@nestjs/swagger";

export class UserDto {
    @ApiProperty({ example: 'john_doe' })
    username: string;

    @ApiProperty({ example: '123qwe!@#' })
    password: string;

    @ApiProperty({ example: 'hello@world.com' })
    email: string;
};