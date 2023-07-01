import { PasswordHashDto } from './dtos/PasswordHashDto';
import { Hasher } from '../../../util/encryption/Hasher';
import { Hash } from '../../../util/encryption/Hash';

export class PasswordHasher {

  static async hashPassword(password: string, salt: string = null): Promise<PasswordHashDto> {
    const hasher: Hash = new Hasher()
    if ( salt === null)
      salt = await hasher.generateSalt()
    const hashedPassword = await hasher.hash(password, salt)
    return new PasswordHashDto(salt, hashedPassword)
  }
}