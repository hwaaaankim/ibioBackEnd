import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class AddTaxRateDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: 'taxId', description: 'Tax id' })
  taxId: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: 'name', description: 'State tax' })
  stateId: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ type: 'name', description: 'Tax rate percent' })
  percent: number;
}
