import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AddTagDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: 'name', description: 'Name of tag' })
  name: string;
}
