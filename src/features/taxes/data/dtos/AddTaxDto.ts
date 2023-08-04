import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AddTaxDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: 'name', description: 'Name of Tax' })
  name: string;
}
