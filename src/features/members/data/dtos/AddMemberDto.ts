import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AddMemberDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, description: 'fullName' })
  fullName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, description: 'responsibilly' })
  responsiblity: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, description: 'description' })
  description: string;
}
