import { IsOptional, IsString } from 'class-validator';

export class UpdateMemberSocialAccountDto {
  @IsString()
  @IsOptional()
  memberId: string;

  @IsString()
  @IsOptional()
  link: string;

  icon: string;
}
