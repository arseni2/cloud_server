import {ApiProperty} from "@nestjs/swagger";

export class CreateUserDto {
    @ApiProperty({ default: 'test@mail.ru' })
    email: string

    @ApiProperty()
    fullName: string

    @ApiProperty({ default: '123' })
    password: string
}
