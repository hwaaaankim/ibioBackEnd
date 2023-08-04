import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AddPaymentMethodDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: 'name', description: 'Name of payment method' })
  name: string;

  @ApiProperty({ type: 'icon', description: 'Icon of payment Method' })
  icon: string;
}
