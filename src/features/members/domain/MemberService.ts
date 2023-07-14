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
  addMember(newMember: AddMemberDto) {
    return this.repository.addMember(newMember);
  }
  updateMember(id: string, updatedMember: UpdateMemberDto) {
    return this.repository.updateMember(id, updatedMember);
  }
  getMember(id: string) {
    return this.getMember(id);
  }
  getMembers() {
    return this.repository.getMembers();
  }
  deleteMember(id: string) {
    return this.repository.deleteMember(id);
  }
  addMemberSocialAccount(newSocailAccount: AddMemberSocialAccountDto) {
    return this.repository.addMemberSocialAccount(newSocailAccount);
  }
  updateMemberSocialAccount(
    id: string,
    memberSocialAccount: UpdateMemberSocialAccountDto,
  ) {
    return this.repository.updateMemberSocialAccount(id, memberSocialAccount);
  }
  deleteMemberSocailAccount(id: string) {
    return this.repository.deleteMemberSocailAccount(id);
  }
}
