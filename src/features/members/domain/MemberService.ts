import { AddMemberDto } from '../data/dtos/AddMemberDto';
import { AddMemberSocialAccountDto } from '../data/dtos/AddMemberSocialAccountDto';
import { UpdateMemberDto } from '../data/dtos/UpdateMemberDto';
import { UpdateMemberSocialAccountDto } from '../data/dtos/UpdateMemberSocialAccountDto';
import { Member } from './Member';

export class MemberService implements Member {
  repository: Member;

  constructor(repository: Member) {
    this.repository = repository;
  }
  addMember(newMember: AddMemberDto): any {
    return this.repository.addMember(newMember);
  }
  updateMember(id: string, updatedMember: UpdateMemberDto): any {
    return this.repository.updateMember(id, updatedMember);
  }
  getMember(id: string): any {
    return this.repository.getMember(id);
  }
  getMembers(): any {
    return this.repository.getMembers();
  }
  deleteMember(id: string): any {
    return this.repository.deleteMember(id);
  }
  addMemberSocialAccount(newSocailAccount: AddMemberSocialAccountDto): any {
    return this.repository.addMemberSocialAccount(newSocailAccount);
  }
  updateMemberSocialAccount(
    id: string,
    memberSocialAccount: UpdateMemberSocialAccountDto,
  ): any {
    return this.repository.updateMemberSocialAccount(id, memberSocialAccount);
  }
  deleteMemberSocailAccount(id: string): any {
    return this.repository.deleteMemberSocailAccount(id);
  }
}
