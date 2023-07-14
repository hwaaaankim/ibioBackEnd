import { CommonEntity } from 'src/database/CommonEntity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { MemberEntity } from './MemberEntity';

@Entity('member_social_accounts')
export class MemberSocialAccountEntity extends CommonEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  memberId: string;

  @Column('varchar')
  icon: string;

  @Column('text')
  link: string;

  @ManyToOne(() => MemberEntity, (member) => member.socialAccounts)
  member: MemberEntity;
}
