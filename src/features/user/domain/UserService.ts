import { AddUserVerificationDto } from './../data/dtos/AddUserVerificationDto';
import { LoginDto } from "../data/dtos/LoginDto";
import { UserDto } from "../data/dtos/UserDto";
import { User } from "./User";
import { PasswordDto } from '../data/dtos/PasswordDto';

export class UserService implements User {
 
  

  repository: User

  emailExists(email: string): any {
    return this.repository.emailExists(email)
  }
  phoneNumberExists(phoneNumber: string): any {
    return this.repository.phoneNumberExists(phoneNumber)
  }

  register(userDto: UserDto): any {
    return this.repository.register(userDto)
  }

  resendCode(email: string): any {
    return this.repository.resendCode(email);
  }

  login(loginDto: LoginDto): any {
    return this.repository.login(loginDto)
  }

  verifyUser(verification: AddUserVerificationDto): any {
    return this.repository.verifyUser(verification)
  }

  getAccounts(page?: number, limit?: number): any {
    return this.repository.getAccounts(page, limit)
  }

  activateAccount(id: string): any {
    return this.repository.activateAccount(id)
  }

  deactivateAccount(id: string): any {
    return this.repository.deactivateAccount(id);
  }

  updateAccount(userDto: UserDto): any {
    return this.repository.updateAccount(userDto)
  }

  updatePassword(passwordDto: PasswordDto): any {
    return this.repository.updatePassword(passwordDto);
  }

}