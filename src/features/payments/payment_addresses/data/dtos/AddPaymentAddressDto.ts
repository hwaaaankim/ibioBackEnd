import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class AddPaymentAddressDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: 'userId', description: 'User id' })
  userId: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: 'stateId', description: 'State id' })
  stateId: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: 'city', description: 'city' })
  city: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ type: 'company', description: 'company' })
  company: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: 'telephone', description: 'telephone' })
  telephone: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: 'addressOne', description: 'Address one' })
  addressOne: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ type: 'addressTwo', description: 'Address two' })
  addressTwo: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ type: 'fax', description: 'fax' })
  fax: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ type: 'postCode', description: 'Post code' })
  postCode: number;
}
