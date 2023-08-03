import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateMemberSocialAccountDto {
  @ApiProperty({ type: 'memberId', description: 'Member id' })
  @IsString()
  @IsOptional()
  memberId: string;

  @ApiProperty({ type: 'link', description: 'link' })
  @IsString()
  @IsOptional()
  link: string;

  @ApiProperty({ type: 'icon', description: 'icon' })
  icon: string;
}
