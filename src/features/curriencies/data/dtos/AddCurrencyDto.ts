import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class AddCurrencyDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: 'name', description: 'Currency name' })
  name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: 'code', description: 'Unique international code' })
  code: string;

  @IsNotEmpty()
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

  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty({ type: 'isDefault', description: 'Is default currency' })
  isDefault: boolean;
}
