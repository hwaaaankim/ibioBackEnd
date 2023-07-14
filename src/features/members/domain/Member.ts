import { AddMemberDto } from '../data/dtos/AddMemberDto';
import { AddMemberSocialAccountDto } from '../data/dtos/AddMemberSocialAccountDto';
import { UpdateMemberDto } from '../data/dtos/UpdateMemberDto';
import { UpdateMemberSocialAccountDto } from '../data/dtos/UpdateMemberSocialAccountDto';

export interface Member {
  addMember(newMember: AddMemberDto): any;
  updateMember(id: string, updatedMember: UpdateMemberDto): any;
  getMember(id: string): any;
  getMembers(): any;
  deleteMember(id: string): any;
  addMemberSocialAccount(newSocailAccount: AddMemberSocialAccountDto): any;
  updateMemberSocialAccount(
    id: string,
    memberSocialAccount: UpdateMemberSocialAccountDto,
  ): any;
  deleteMemberSocailAccount(id: string): any;
}
