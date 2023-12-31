import { UnauthorizedException } from '@nestjs/common';
import { AuthenticatedUser } from './../domain/AuthenticatedUser';
import { AddUserVerificationDto } from './dtos/AddUserVerificationDto';
import { UserVerificationEntity } from './models/UserVerificationEntity';
import { SystemErrorException } from './../../../util/exception/SystemErrorException';
import { DuplicateResouceFound } from './../../../util/exception/DuplicateResourceFound';
import { DataNotFoundException } from './../../../util/exception/DataNotFoundException';
import { PasswordHasher } from './PasswordHasher';
import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';
import { getRepository } from 'typeorm';
import { User } from '../domain/User';
import { LoginDto } from './dtos/LoginDto';
import { PasswordHashDto } from './dtos/PasswordHashDto';
import { UserDto } from './dtos/UserDto';
import { UserEntity } from './models/UserEntity';
import { PasswordDto } from './dtos/PasswordDto';
import { VerificationMail } from '../web/VerificationMail';
import { AddressEntity } from './models/AddressEntity';

export class UserRepository implements User {


  async emailExists(email: string): Promise<any> {
    const exists = await getRepository(this.entity).findOne({ where: { email: email }})
    if (!exists) throw new DataNotFoundException('email doesnt exist')
    return true
  }


  async phoneNumberExists(phoneNumber: string) : Promise<any> {
    const exists = await getRepository(this.entity).findOne({ where: { telephone: phoneNumber }})
    if (!exists) throw new DataNotFoundException('telephone doesnt exist')
    return true
  }

  async updatePassword(passwordDto: PasswordDto): Promise<boolean> {
    const userId = AuthenticatedUser.getInstance().userId
    const user: UserEntity = await getRepository(this.entity).findOne(userId)
    try {
      const hash: PasswordHashDto = await PasswordHasher.hashPassword(
        passwordDto.oldPassword,
        user.salt,
      );
      if (hash.hashedPassword !== passwordDto.oldPassword) {
        throw new UnauthorizedException('Incorrect login credentials');
      }
      const hashed = await PasswordHasher.hashPassword(passwordDto.newPassword, user.salt)
      user.password = hashed.hashedPassword
      await user.save()
      return true
    } catch (e) {
      throw new SystemErrorException()
    }
  }

  // set the entity ( db table )
  entity: EntityClassOrSchema = UserEntity;
  user = AuthenticatedUser.getInstance();


  async updateAccount(userDto: UserDto): Promise<any> {
    const user = AuthenticatedUser.getInstance()
    const loggedUser: UserEntity = await getRepository(this.entity).findOne(user.userId)
    loggedUser.firstName = userDto.firstName
    loggedUser.lastName = userDto.lastName
    loggedUser.email = userDto.email
    loggedUser.telephone = userDto.telephone
    if (userDto.fax) loggedUser.fax = userDto.fax
    try {
      await loggedUser.save()
    } catch (e) {
      throw new SystemErrorException()
    }
  }

  async register(userDto: UserDto): Promise<any> {
    // get repository for entity
    const repository = getRepository(this.entity);
    // hash password with a newly generated salt
    const hash: PasswordHashDto = await PasswordHasher.hashPassword(
      userDto.password,
    );
    // add password and hash to userDto
    userDto.salt = hash.salt;
    userDto.password = hash.hashedPassword;
    try {
      // save the user info
      const user: UserEntity = await repository.create(userDto).save();
      const address = userDto.address
      address.userId = user.id
      // create the address
      await getRepository(AddressEntity).create(address).save()
      // generate verification code
      const code = this.generateVerificationCode()
      await getRepository(UserVerificationEntity).create({
        email: user.email,
        verificationCode: code
      }).save()
      return await repository.findOne({ where: { id: user.id }, relations: ['address', 'verification']})
    } catch (error) {
      // check if account alreay exists
      if (error.code === 'ER_DUP_ENTRY') {
        throw new DuplicateResouceFound('Account already exists');
      }
      // throw general system error
      else {
        throw new SystemErrorException();
      }
    }
  }

  async login(loginDto: LoginDto): Promise<any> {
    const user: any = await getRepository(this.entity).findOne({
      where: { email: loginDto.email }, relations: ['address']
    });
    // check if user is found
    if (user) {
      // hash password and compare
      const hash: PasswordHashDto = await PasswordHasher.hashPassword(
        loginDto.password,
        user.salt,
      );
      if (hash.hashedPassword !== user.password) {
        throw new UnauthorizedException('Incorrect login credentials');
      }
      // check if user is activated
      // const activated = await getRepository(UserVerificationEntity).findOne( { where: { userId: user.id, verified: true}})
      // if ( ! activated ) {
      //   user.remove
      //   user.salt = null
      //   throw new NotActivatedException(user)
      // }
      return user;
    } else {
      throw new UnauthorizedException('Account doesnt exist');
    }
  }


  async resendCode(email: string): Promise<any> {
    const verification: UserVerificationEntity = await getRepository(UserVerificationEntity).findOne({ where: { email: email } });
    const code = this.generateVerificationCode()
    verification.verificationCode = code
    try {
      await verification.save()
      return code
    } catch (e) {
      throw new SystemErrorException()
    }
  }

  private generateVerificationCode()  {
    const code = (Math.floor(Math.random() * 1000000) + 1000000).toString().substring(1)
    return code;
  }

  async verifyUser(verificationDto: AddUserVerificationDto): Promise<any> {
    const verification: UserVerificationEntity = await getRepository(
      UserVerificationEntity,
    ).findOne({ where: { email: verificationDto.email } });
    if (!verification) {
      throw new DataNotFoundException('Email not found');
    } else {
      if (verification.verificationCode != verificationDto.verificationCode) {
        throw new DataNotFoundException('Wrong verification code');
      } else {
        verification.verified = true;
        try {
          await verification.save();
          const user: any = await getRepository(UserEntity).findOne({ where: { email: verificationDto.email }});
          user.status = true
          await user.save()
          return verification;
        } catch (e) {
          throw new SystemErrorException(e)
        }
      }
    }
  }

  async getAccounts(page?, limit?): Promise<any> {
    const currentPage = page * 1 || 10;
    const take = limit * 1;
    const skip = (currentPage - 1) * limit || 0;
    let accounts = await getRepository(this.entity).find({ 
        withDeleted: false, 
        relations: ['shop']
      })
    accounts = accounts.filter(account => account.role != 'ADMIN')
    if (!accounts)
      throw new DataNotFoundException('No accounts registered so far');
    return accounts;
  }

  async activateAccount(id: string): Promise<boolean> {
    const account: UserEntity = await getRepository(this.entity).findOne(id, {
      where: { status: false },
    });
    if (!account) throw new DataNotFoundException('Account doesnt exist');
    try {
      account.status = true;
      account.save();
      return true;
    } catch (e) {
      throw new SystemErrorException('Something went wrong');
    }
  }

  async deactivateAccount(id: string): Promise<boolean> {
    const account: UserEntity = await getRepository(this.entity).findOne(id, {
      where: { status: true },
    });
    if (!account) throw new DataNotFoundException('Account doesnt exist');
    try {
      account.status = false;
      account.save();
      return true;
    } catch (e) {
      throw new SystemErrorException('Something went wrong');
    }
  }
}
