import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AddMemberSocialAccountDto {
  @ApiProperty({ type: 'memberId', description: 'Member id' })
  @IsString()
  @IsNotEmpty()
  memberId: string;

  @ApiProperty({ type: 'link', description: 'link' })
  @IsString()
  @IsNotEmpty()
  link: string;

  @ApiProperty({ type: 'icon', description: 'icon' })
  icon: string;
}
