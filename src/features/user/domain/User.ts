import { AddUserVerificationDto } from './../data/dtos/AddUserVerificationDto';
import { LoginDto } from "../data/dtos/LoginDto";
import { UserDto } from "../data/dtos/UserDto";
import { PasswordDto } from '../data/dtos/PasswordDto';

export interface User {

  register(userDto: UserDto): any
  login(loginDto: LoginDto): any
  verifyUser(verification: AddUserVerificationDto): any
  getAccounts(page?: number, limit?: number): any
  activateAccount(id: string): any
  deactivateAccount(id: string): any
  resendCode(email: string): any
  updateAccount(userDto: UserDto): any
  updatePassword(passwordDto: PasswordDto): any
  emailExists(email: string): any
  phoneNumberExists(phoneNumber: string): any
}