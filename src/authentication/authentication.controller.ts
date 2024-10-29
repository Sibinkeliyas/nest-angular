import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/createUser.dto';
import { JwtService } from '@nestjs/jwt';

@ApiTags('authentication')
@Controller('authentication')
export class AuthenticationController {
  constructor(
    private authService: AuthenticationService,
    private jwtService: JwtService,
  ) {}

  @Post()
  async createUser(@Body() user: CreateUserDto) {
    try {
      const createUser = await this.authService.create(user);
      const payload = {
        id: createUser._id,
        username: createUser.userName,
        email: createUser.email,
      };

      return {
        ...payload,
        access_token: await this.jwtService.signAsync(payload),
      };
    } catch (error) {
      return error;
    }
  }

  @Get('/:email/:password')
  async signIn(
    @Param('email') email: string,
    @Param('password') password: string,
  ) {
    try {
      const user = await this.authService.findOne(email, password);
      const payload = {
        id: user._id,
        username: user.userName,
        email: user.email,
      };
      if (user) {
        return {
          ...payload,
          access_token: await this.jwtService.signAsync(payload),
        };
      } else {
        return { success: false, message: 'Could find user' };
      }
    } catch (error) {
      return error;
    }
  }
}
