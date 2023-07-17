import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateMemberDto {
  @ApiProperty({ type: String, description: 'fullName' })
  @IsString()
  @IsOptional()
  fullName: string;

  @ApiProperty({ type: String, description: 'responsibliity' })
  @IsString()
  @IsOptional()
  responsiblity: string;

  @ApiProperty({ type: String, description: 'description' })
  @IsString()
  @IsOptional()
  description: string;
}
