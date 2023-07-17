import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateMemberSocialAccountDto {
  @ApiProperty({ type: String, description: 'member id' })
  @IsString()
  @IsOptional()
  memberId: string;

  @ApiProperty({ type: String, description: 'link' })
  @IsString()
  @IsOptional()
  link: string;

  @ApiProperty({ type: String, description: 'icon' })
  icon: string;
}
