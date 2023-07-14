import { IsNotEmpty, IsString } from 'class-validator';

export class AddMemberDto {
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @IsString()
  @IsNotEmpty()
  responsiblity: string;

  @IsString()
  @IsNotEmpty()
  description: string;
}
