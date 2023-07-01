import { IsEmail, IsNotEmpty } from 'class-validator';

export class AddUserVerificationDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsEmail()
  verificationCode: string;
}
