import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
} from 'typeorm';

@Entity('mw_contact_us')
export class Contact {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: number;

  @Column({ length: 150 })
  email: string;

  @Column({ length: 150 })
  name: string;

  @Column({ name: 'meassage', type: 'text' })
  message: string;

  @Column({ length: 250, nullable: true })
  city: string;

  @Column({ length: 20, nullable: true })
  phone: string;

  @Column({ length: 250, nullable: true })
  url: string;

  @Column({ name: 'ad_id', nullable: true })
  property_id: number;

  @Column({ name: 'contact_type', type: 'enum', enum: ['CONTACT', 'ENQUIRY'], default: 'CONTACT' })
  contact_type: string;

  @Column({ name: 'is_p', type: 'varchar', length: 1, nullable: true })
  is_read: string;

  @Column({ nullable: true })
  user_id: number;

  @Column({ type: 'timestamp' })
  date: Date;

  @Column({ name: 'date_added', type: 'datetime', nullable: true })
  created_at: Date;

  @Column({ nullable: true })
  m_id2: number;

  @Column({ nullable: true })
  m_id3: number;

  @Column({ nullable: true })
  i_am: number;

  @Column({ nullable: true })
  m_id4: number;

  @Column({ nullable: true })
  m_id5: number;

  @Column({ type: 'date', nullable: true })
  visit: Date;
}
