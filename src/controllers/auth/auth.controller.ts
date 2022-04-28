import {
  Body,
  Controller,
  HttpCode,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { UserDto } from 'src/dto/user.dto';
import { AuthService } from 'src/services/auth.service';
import { RequestUser } from 'src/interfaces/requestUser.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(200)
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() request: RequestUser, @Body() userData: UserDto) {
    return this.authService.validateUser(userData);
  }

  @Post('register')
  async register(@Body() userData: CreateUserDto) {
    return this.authService.registerUser(userData);
  }
}
