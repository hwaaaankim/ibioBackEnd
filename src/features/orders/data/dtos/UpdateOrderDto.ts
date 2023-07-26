import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateOrderDto {
  @IsOptional()
  @IsString()
  @ApiProperty({ type: 'name', description: 'Name of Order' })
  name: string;
}
