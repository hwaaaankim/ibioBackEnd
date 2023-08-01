import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdatePaymentMethodDto {
  @IsOptional()
  @IsString()
  @ApiProperty({ type: 'name', description: 'name of Payment method' })
  name: string;

  @ApiProperty({ type: 'icon', description: 'Icon of Payment method' })
  icon: string;
}
