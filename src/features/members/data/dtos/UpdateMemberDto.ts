import { IsOptional, IsString } from 'class-validator';

export class UpdateMemberDto {
  @IsString()
  @IsOptional()
  fullName: string;

  @IsString()
  @IsOptional()
  responsiblity: string;

  @IsString()
  @IsOptional()
  description: string;
}
