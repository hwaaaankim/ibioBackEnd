import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateStateDto {
  @IsOptional()
  @IsString()
  @ApiProperty({ type: 'name', description: 'Name of state' })
  name: string;
}
