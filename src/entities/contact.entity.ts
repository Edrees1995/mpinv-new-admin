import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('mw_contact_us')
export class Contact {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 255 })
  email: string;

  @Column({ length: 50, nullable: true })
  phone: string;

  @Column({ length: 255, nullable: true })
  subject: string;

  @Column({ type: 'text' })
  message: string;

  @Column({ length: 50, nullable: true })
  source: string; // contact-form, property-inquiry, project-inquiry

  @Column({ nullable: true })
  property_id: number;

  @Column({ nullable: true })
  project_id: number;

  @Column({ type: 'tinyint', default: 0 })
  is_read: number;

  @Column({ type: 'tinyint', default: 0 })
  is_replied: number;

  @Column({ type: 'text', nullable: true })
  reply: string;

  @Column({ type: 'datetime', nullable: true })
  replied_at: Date;

  @Column({ length: 50, nullable: true })
  ip_address: string;

  @Column({ type: 'text', nullable: true })
  user_agent: string;

  @CreateDateColumn()
  created_at: Date;
}
