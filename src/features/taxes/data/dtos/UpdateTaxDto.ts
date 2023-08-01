import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateTaxDto {
  @IsOptional()
  @IsString()
  @ApiProperty({ type: 'name', description: 'Name of Tax' })
  name: string;
}
