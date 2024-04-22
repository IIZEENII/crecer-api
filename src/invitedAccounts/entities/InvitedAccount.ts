import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('invited_accounts')
export class InvitedAccount {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  invitationToken: string;

  @Column({ unique: true })
  email: string;

  @CreateDateColumn()
  expirationDate: Date;
}
