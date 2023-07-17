import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AddMemberSocialAccountDto {
  @ApiProperty({ type: String, description: 'member id' })
  @IsString()
  @IsNotEmpty()
  memberId: string;

  @ApiProperty({ type: String, description: 'link' })
  @IsString()
  @IsNotEmpty()
  link: string;

  @ApiProperty({ type: String, description: 'icon' })
  icon: string;
}
