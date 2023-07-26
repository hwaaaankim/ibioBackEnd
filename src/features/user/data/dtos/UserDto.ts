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
  IsDefined,
  IsNotEmptyObject,
  ValidateNested,
} from 'class-validator'
import { AddressDto } from './AddressDto'
import { Type } from 'class-transformer'

export class UserDto {
  @IsNotEmpty()
  @IsString()
  firstName: string

  @IsNotEmpty()
  @IsString()
  lastName: string

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  userName: string

  @IsNotEmpty()
  @IsEmail()
  email: string

  @IsEmpty()
  salt: string

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(30)
  @ApiProperty({ type: String, description: 'password' })
  password: string

  @IsDefined()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => AddressDto)
  @ApiProperty({ type: Object, description: 'address object' })
  address: AddressDto

}
