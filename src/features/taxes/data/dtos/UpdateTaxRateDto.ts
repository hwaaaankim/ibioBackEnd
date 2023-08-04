import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateTaxRateDto {
  @IsOptional()
  @IsString()
  @ApiProperty({ type: 'taxId', description: 'Tax id' })
  taxId: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ type: 'name', description: 'State tax' })
  stateId: string;

  @IsOptional()
  @IsNumber()
  @ApiProperty({ type: 'name', description: 'Tax rate percent' })
  percent: number;
}
