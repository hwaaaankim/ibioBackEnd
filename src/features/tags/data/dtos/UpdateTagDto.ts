import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateTagDto {
  @IsOptional()
  @IsString()
  @ApiProperty({ type: 'name', description: 'Name of Tag' })
  name: string;
}
