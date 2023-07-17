import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { MemberService } from '../domain/MemberService';
import { DatabaseFactory } from 'src/database/DatabaseFactory';
import { AddMemberDto } from '../data/dtos/AddMemberDto';
import { UpdateMemberDto } from '../data/dtos/UpdateMemberDto';
import { AddMemberSocialAccountDto } from '../data/dtos/AddMemberSocialAccountDto';
import { UpdateMemberSocialAccountDto } from '../data/dtos/UpdateMemberSocialAccountDto';
import { JwtAuthGuard } from '../../../util/auth/jwt/JwtAuthGuard';
import { Role } from '../../../util/decorators/Role';
import { MulterImageConfig } from '../../../util/file_upload/MulterConfig';
import { FileInterceptor } from '@nestjs/platform-express';
import { ValidationException } from '../../../util/exception/ValidationException';

@Controller('members')
export class MemberController {
  private memberService: MemberService;

  constructor() {
    this.memberService = new MemberService(
      DatabaseFactory.getRepository('MEMBER'),
    );
  }

  @Post()
  @UsePipes(ValidationPipe)
  @UseGuards(JwtAuthGuard)
  @Role(['admin'])
  addMember(@Body() addMemberDto: AddMemberDto): any {
    return this.memberService.addMember(addMemberDto);
  }

  @Put(':id')
  @UsePipes(ValidationPipe)
  @UseGuards(JwtAuthGuard)
  @Role(['admin'])
  updateMember(
    @Param('id') id: string,
    @Body() updatedMember: UpdateMemberDto,
  ): any {
    return this.memberService.updateMember(id, updatedMember);
  }

  @Get(':id')
  getMember(@Param('id') id: string): any {
    return this.memberService.getMember(id);
  }

  @Get()
  getMembers(): any {
    return this.memberService.getMembers();
  }

  @Delete(':id')
  @UsePipes(ValidationPipe)
  @UseGuards(JwtAuthGuard)
  @Role(['admin'])
  deleteMember(@Param('id') id: string): any {
    return this.memberService.deleteMember(id);
  }

  @Post('/social_account')
  @UsePipes(ValidationPipe)
  @UseInterceptors(FileInterceptor('icon', MulterImageConfig))
  @UseGuards(JwtAuthGuard)
  @Role(['admin'])
  addMemberSocialAccount(
    @Body() newSocailAccount: AddMemberSocialAccountDto,
    @UploadedFile() icon: any,
  ): any {
    if (!icon) {
      throw new ValidationException('Icon is required');
    }
    newSocailAccount.icon = icon.filename;

    return this.memberService.addMemberSocialAccount(newSocailAccount);
  }

  @Put('/social_accounts/:id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('icon', MulterImageConfig))
  @Role(['admin'])
  updateMemberSocialAccount(
    @Param('id') id: string,
    @Body() memberSocialAccount: UpdateMemberSocialAccountDto,
    @UploadedFile() icon: any,
  ): any {
    if (icon) {
      memberSocialAccount.icon = icon.filename;
    }
    return this.memberService.updateMemberSocialAccount(
      id,
      memberSocialAccount,
    );
  }

  @Delete('/socail_accounts/:id')
  @UseGuards(JwtAuthGuard)
  @Role(['admin'])
  deleteMemberSocailAccount(@Param('id') id: string): any {
    return this.memberService.deleteMemberSocailAccount(id);
  }
}
