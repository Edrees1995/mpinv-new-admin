import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
} from 'typeorm';

@Entity('mw_listing_users')
export class ListingUser {
  @PrimaryGeneratedColumn({ name: 'user_id' })
  id: number;

  @Column({ length: 150, nullable: true })
  first_name: string;

  @Column({ length: 150, nullable: true })
  last_name: string;

  @Column({ length: 500, nullable: true })
  address: string;

  @Column({ length: 150, nullable: true })
  city: string;

  @Column({ length: 150, nullable: true })
  state: string;

  @Column({ nullable: true })
  country_id: number;

  @Column({ length: 7, nullable: true })
  zip: string;

  @Column({ length: 15, nullable: true })
  phone: string;

  @Column({ length: 10, nullable: true })
  fax: string;

  @Column({ length: 150 })
  email: string;

  @Column({ length: 250 })
  password: string;

  @Column({ type: 'int', default: 0 })
  isTrash: number;

  @Column({ type: 'enum', enum: ['A', 'I'], default: 'A' })
  status: string;

  @Column({ type: 'timestamp' })
  date_added: Date;

  @Column({ type: 'enum', enum: ['N', 'Y'], default: 'N' })
  send_me: string;

  @Column({ length: 150, nullable: true })
  verification_code: string;

  @Column({ length: 250, nullable: true })
  reset_key: string;

  @Column({ type: 'date', nullable: true })
  dob: Date;

  @Column({ type: 'enum', enum: ['M', 'F'], default: 'M' })
  calls_me: string;

  @Column({ nullable: true })
  country: number;

  @Column({ nullable: true })
  education_level: number;

  @Column({ nullable: true })
  position_level: number;

  @Column({ length: 3, nullable: true })
  updates: string;

  @Column({ length: 3, nullable: true })
  advertisement: string;

  @Column({ type: 'text', nullable: true })
  cover_letter: string;

  @Column({ length: 1, nullable: true })
  con_password: string;

  @Column({ length: 200, nullable: true })
  image: string;

  @Column({ type: 'enum', enum: ['0', '1'], default: '0' })
  xml_inserted: string;

  @Column({ length: 200, nullable: true })
  xml_image: string;

  @Column({ length: 50, nullable: true })
  mobile: string;

  @Column({ length: 250, nullable: true })
  slug: string;

  @Column({ length: 255, nullable: true })
  designation: string;

  @Column({ length: 255, nullable: true })
  brn_number: string;

  @Column({ length: 255, nullable: true })
  langauges_known: string;
}
