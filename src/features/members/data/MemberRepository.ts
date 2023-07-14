import { Member } from '../domain/Member';
import { AddMemberDto } from './dtos/AddMemberDto';
import { AddMemberSocialAccountDto } from './dtos/AddMemberSocialAccountDto';
import { UpdateMemberDto } from './dtos/UpdateMemberDto';
import { UpdateMemberSocialAccountDto } from './dtos/UpdateMemberSocialAccountDto';
import { AppDataSource } from '../../../database/config/TypeOrmConfig';
import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';
import { MemberEntity } from './models/MemberEntity';
import { SystemErrorException } from 'src/util/exception/SystemErrorException';
import { DataNotFoundException } from 'src/util/exception/DataNotFoundException';
import { MemberSocialAccountEntity } from './models/MemberSocialAccountEntity';
import { unlinkSync } from 'fs';

export class MemberRepository implements Member {
  entity: EntityClassOrSchema = MemberEntity;
  private memberRepository = AppDataSource.getRepository(this.entity);
  private memberSocialAccountRepository = AppDataSource.getRepository(
    MemberSocialAccountEntity,
  );

  async addMember(newMember: AddMemberDto): Promise<boolean> {
    try {
      await this.memberRepository.create(newMember).save();
      return true;
    } catch (e) {
      throw new SystemErrorException();
    }
  }

  async updateMember(
    id: string,
    updatedMember: UpdateMemberDto,
  ): Promise<boolean> {
    const member = await this.getMember(id);

    if (updatedMember.fullName) {
      member.fullName = updatedMember.fullName;
    }
    if (updatedMember.responsiblity) {
      member.responsiblity = updatedMember.responsiblity;
    }

    if (updatedMember.description) {
      member.description = updatedMember.description;
    }

    try {
      await member.save();
      return true;
    } catch (e) {
      throw new SystemErrorException();
    }
  }

  async getMember(id: string): Promise<any> {
    const member = await this.memberRepository.findOne({ where: { id: id } });
    if (!member) {
      throw new DataNotFoundException('Member not found.');
    }
    return member;
  }

  private async getMemberSocialAccount(id: string): Promise<any> {
    const memberSocialAccount =
      await this.memberSocialAccountRepository.findOne({
        where: { id: id },
      });
    if (!memberSocialAccount) {
      throw new DataNotFoundException('Member social account not found.');
    }
    return memberSocialAccount;
  }

  async getMembers(): Promise<any> {
    const members = await this.memberRepository.find({
      relations: ['socialAccount'],
    });
    if (!members) {
      throw new DataNotFoundException('Member not found.');
    }
    return members;
  }

  async deleteMember(id: string): Promise<boolean> {
    const member = await this.getMember(id);
    try {
      await member.softRemove();
      return true;
    } catch (e) {
      throw new SystemErrorException();
    }
  }

  async addMemberSocialAccount(
    newSocailAccount: AddMemberSocialAccountDto,
  ): Promise<boolean> {
    try {
      await this.memberRepository.create(newSocailAccount).save();
      return true;
    } catch (e) {
      throw new SystemErrorException();
    }
  }

  async updateMemberSocialAccount(
    id: string,
    updatedMemberSocialAccount: UpdateMemberSocialAccountDto,
  ): Promise<boolean> {
    const memberSocialAccount = await this.getMemberSocialAccount(id);

    if (updatedMemberSocialAccount.memberId) {
      memberSocialAccount.memberId = updatedMemberSocialAccount.memberId;
    }
    if (updatedMemberSocialAccount.link) {
      memberSocialAccount.link = updatedMemberSocialAccount.link;
    }

    if (updatedMemberSocialAccount.icon) {
      memberSocialAccount.icon = updatedMemberSocialAccount.icon;
      unlinkSync(`uploads/images/${updatedMemberSocialAccount.icon}`);
    }

    try {
      await memberSocialAccount.save();
      return true;
    } catch (e) {
      throw new SystemErrorException();
    }
  }

  async deleteMemberSocailAccount(id: string): Promise<boolean> {
    const memberSocialAccount = await this.getMemberSocialAccount(id);
    try {
      await memberSocialAccount.softRemove();
      return true;
    } catch (e) {
      throw new SystemErrorException();
    }
  }
}
