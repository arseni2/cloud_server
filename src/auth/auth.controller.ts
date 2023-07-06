import {Body, Controller, Post, Request, UseGuards} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {ApiBody, ApiTags} from "@nestjs/swagger";
import {CreateUserDto} from "../users/dto/create-user.dto";
import {UserEntity} from "../users/entities/user.entity";
import {AuthGuard} from "@nestjs/passport";

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @UseGuards(AuthGuard('local'))
    @Post('login')
    @ApiBody({ type: CreateUserDto })
    async login(@Request() req) {
        return this.authService.login(req.user as UserEntity);
    }

    @Post('/register')
    register(@Body() dto: CreateUserDto) {
        return this.authService.register(dto);
    }
}
