import { CommonEntity } from 'src/database/CommonEntity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { MemberSocialAccountEntity } from './MemberSocialAccountEntity';

@Entity('members')
export class MemberEntity extends CommonEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { nullable: false })
  fullName: string;

  @Column('varchar', { nullable: false })
  responsibility: string;

  @Column('text', { nullable: false })
  description: string;

  @OneToMany(
    () => MemberSocialAccountEntity,
    (socialAccount) => socialAccount.member,
    { onDelete: 'CASCADE' },
  )
  socialAccounts: MemberSocialAccountEntity[];
}
