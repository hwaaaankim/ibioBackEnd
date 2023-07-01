import { ApiProperty } from '@nestjs/swagger'
import {
  IsNotEmpty,
  IsString,
  IsEmail,
  IsEmpty,
  IsIn,
  MinLength,
  MaxLength,
  IsNumber,
  IsOptional,
} from 'class-validator'
import { AddressDto } from './AddressDto'

export class UserDto {
  @IsNotEmpty()
  @IsString()
  firstName: string

  @IsNotEmpty()
  @IsString()
  lastName: string

  @IsNotEmpty()
  @IsEmail()
  email: string

  @IsNotEmpty()
  telephone: string

  @IsNumber()
  @IsOptional()
  fax: number

  @IsEmpty()
  salt: string


  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(30)
  @ApiProperty({ type: String, description: 'password' })
  password: string

  @IsNotEmpty()
  address: AddressDto

}
