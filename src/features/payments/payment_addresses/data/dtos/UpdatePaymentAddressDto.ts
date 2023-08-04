import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdatePaymentAddressDto {
  @IsOptional()
  @IsString()
  @ApiProperty({ type: 'userId', description: 'User id' })
  userId: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ type: 'stateId', description: 'State id' })
  stateId: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ type: 'city', description: 'city' })
  city: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ type: 'company', description: 'company' })
  company: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ type: 'telephone', description: 'telephone' })
  telephone: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ type: 'addressOne', description: 'Address one' })
  addressOne: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ type: 'addressTwo', description: 'Address two' })
  addressTwo: string;

  @IsOptional()
  @IsNumber()
  @ApiProperty({ type: 'fax', description: 'fax' })
  fax: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty({ type: 'postCode', description: 'Post code' })
  postCode: number;
}
