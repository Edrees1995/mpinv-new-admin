import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('mw_user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  username: string;

  @Column({ length: 255 })
  email: string;

  @Column({ length: 255 })
  password: string;

  @Column({ length: 100, nullable: true })
  first_name: string;

  @Column({ length: 100, nullable: true })
  last_name: string;

  @Column({ length: 50, nullable: true })
  phone: string;

  @Column({ length: 255, nullable: true })
  avatar: string;

  @Column({ length: 50, default: 'admin' })
  role: string; // admin, editor, moderator

  @Column({ type: 'tinyint', default: 1 })
  status: number;

  @Column({ length: 255, nullable: true })
  auth_key: string;

  @Column({ length: 255, nullable: true })
  password_reset_token: string;

  @Column({ type: 'datetime', nullable: true })
  last_login: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
