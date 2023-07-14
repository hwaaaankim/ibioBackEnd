import { CommonEntity } from 'src/database/CommonEntity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { MemberSocialAccountEntity } from './MemberSocialAccountEntity';

@Entity('members')
export class MemberEntity extends CommonEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  fullName: string;

  @Column('varchar')
  responsiblity: string;

  @Column('text')
  description: string;

  @OneToMany(
    () => MemberSocialAccountEntity,
    (socialAccount) => socialAccount.member,
  )
  socialAccounts: MemberSocialAccountEntity[];
}
