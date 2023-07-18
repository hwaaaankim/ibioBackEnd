import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateCurrencyDto {
  @IsOptional()
  @IsString()
  @ApiProperty({ type: 'name', description: 'Currency name' })
  name: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ type: 'code', description: 'Unique international code' })
  code: string;

  @IsOptional()
  @IsNumber()
  @ApiProperty({
    type: 'decimalPlaces',
    description: 'Nnmber of decimals after the point',
  })
  decimalPlaces: number;

  @IsOptional()
  @IsString()
  @ApiProperty({ type: 'displaySymbol', description: 'Display symbol' })
  dsiplaySymbol: string;
}
