import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateMemberDto {
  @ApiProperty({ type: 'fullName', description: 'fullName' })
  @IsString()
  @IsOptional()
  fullName: string;

  @ApiProperty({ type: 'responsibilty', description: 'responsibiliity' })
  @IsString()
  @IsOptional()
  responsibility: string;

  @ApiProperty({ type: 'description', description: 'description' })
  @IsString()
  @IsOptional()
  description: string;
}
