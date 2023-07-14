import { IsNotEmpty, IsString } from 'class-validator';

export class AddMemberSocialAccountDto {
  @IsString()
  @IsNotEmpty()
  memberId: string;

  @IsString()
  @IsNotEmpty()
  link: string;

  icon: string;
}
