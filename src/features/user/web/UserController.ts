/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { AddUserVerificationDto } from './../data/dtos/AddUserVerificationDto';
import { JwtAuthGuard } from './../../../util/auth/jwt/JwtAuthGuard';
import { VerificationMail } from './VerificationMail';
import { JwtSign } from '../../../util/auth/jwt/JwtSign';
import { JwtService } from '@nestjs/jwt';
import { SuccessException } from './../../../util/exception/SuccessException';
import { UserDto } from '../data/dtos/UserDto';
import {
  Body,
  Controller,
  Param,
  Post,
  Get,
  Put,
  UsePipes,
  ValidationPipe,
  UseGuards,
  Patch,
  Query,
} from '@nestjs/common';
import { UserService } from '../domain/UserService';
import { DatabaseFactory } from '../../../database/DatabaseFactory';
import { LoginDto } from '../data/dtos/LoginDto';
import { Role } from '../../../util/decorators/Role';
import { PasswordDto } from '../data/dtos/PasswordDto';

@Controller('users')
export class UserController {
  private userService: UserService;
  private jwtService: JwtService;
  constructor() {
    this.userService = new UserService();
    this.userService.repository = DatabaseFactory.getRepository('user');
    this.jwtService = new JwtService({
      secret: 'jwtSecretTest101',
      signOptions: {
        expiresIn: '12h',
      },
    });
  }

  @Post('/resend/:email')
  async resendCode(@Param('email') email: string): Promise<any> {
    const code =  await this.userService.resendCode(email)
    if( code ) {
      await VerificationMail.send(email, code);
    }
    return true;
  }

  @Put()
  @UsePipes(ValidationPipe)
  @UseGuards(JwtAuthGuard)
  updateAccount(@Body() userDto: UserDto): Promise<any> {
    return this.userService.updateAccount(userDto)
  }

  @Patch('/change_password')
  @UsePipes(ValidationPipe)
  @UseGuards(JwtAuthGuard)
  updatePassword(@Body() passwordDto: PasswordDto): Promise<any> {
    return this.userService.updatePassword(passwordDto)
  }

  @Post('/login')
  @UsePipes(ValidationPipe)
  async login(@Body() loginDto: LoginDto): Promise<any> {
    const user = await this.userService.login(loginDto);
    console.log(user)
    if (user) {
      user.password = null;
      user.salt = null;
      const token = new JwtSign(this.jwtService, {
        userId: user.id,
        email: user.email,
        role: user.role,
        shopId: user.shop != null ? user.shop.id : null
      }).execute();
      const userResponseData = {
        access_token: token,
        user: user,
      };
      throw new SuccessException(userResponseData);
    }
  }

  @Post()
  @UsePipes(ValidationPipe)
  async register(@Body() userDto: UserDto): Promise<any> {
    const user = await this.userService.register(userDto);
    return user
  }

  @Put('/verify')
  async verifyUser(@Body() verification: AddUserVerificationDto): Promise<any> {
    console.log('found');
    return this.userService.verifyUser(verification);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @Role(['ADMIN'])
  getAccounts(@Query('page') page?: number,
  @Query('limit') limit?: number): any {
    return this.userService.getAccounts(page, limit);
  }

  @Patch('/activate/:id')
  @UseGuards(JwtAuthGuard)
  @Role(['admin'])
  activateAccount(@Param('id') userId: string): any {
    return this.userService.activateAccount(userId);
  }

  @Patch('/deactivate/:id')
  @UseGuards(JwtAuthGuard)
  @Role(['admin'])
  deactivateAccount(@Param('id') userId: string): any {
    return this.userService.deactivateAccount(userId);
  }

  @Get('/exists/email/:email')
  emailExists(@Param('email') email: string): any {
    return this.userService.emailExists(email)
  }

  @Get('/exists/phone/:phone')
  phoneNumberExists(@Param('phone') phone: string): any {
    return this.userService.phoneNumberExists(phone)
  }
}
