import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
} from 'typeorm';

@Entity('mw_user')
export class User {
  @PrimaryGeneratedColumn({ name: 'user_id' })
  id: number;

  @Column({ name: 'user_uid', type: 'char', length: 13 })
  uid: string;

  @Column({ name: 'language_id', nullable: true })
  language_id: number;

  @Column({ length: 100, nullable: true })
  first_name: string;

  @Column({ length: 100, nullable: true })
  last_name: string;

  @Column({ length: 100 })
  email: string;

  @Column({ length: 255 })
  password: string;

  @Column({ length: 50, default: '' })
  timezone: string;

  @Column({ type: 'enum', enum: ['yes', 'no'], default: 'yes' })
  removable: string;

  @Column({ type: 'char', length: 15, default: 'inactive' })
  status: string;

  @Column({ type: 'datetime' })
  date_added: Date;

  @Column({ type: 'datetime' })
  last_updated: Date;
}
