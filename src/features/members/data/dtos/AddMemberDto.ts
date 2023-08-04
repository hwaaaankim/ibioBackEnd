import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AddMemberDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: 'fullName', description: 'fullName' })
  fullName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: 'responsibility', description: 'responsibilly' })
  responsibility: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: 'description', description: 'description' })
  description: string;
}
