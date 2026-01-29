import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('mw_category')
export class Category {
  @PrimaryGeneratedColumn({ name: 'category_id' })
  id: number;

  @Column({ name: 'section_id', nullable: true })
  section_id: number;

  @Column({ name: 'category_name', length: 250 })
  name: string;

  @Column({ name: 'short_name', length: 3, nullable: true })
  short_name: string;

  @Column({ name: 'listing_type', length: 1, nullable: true })
  listing_type: string;

  @Column({ name: 'amenities_required', type: 'enum', enum: ['N', 'Y'], default: 'N' })
  amenities_required: string;

  @Column({ length: 250 })
  slug: string;

  @Column({ default: 0 })
  priority: number;

  @Column({ type: 'enum', enum: ['A', 'I'], default: 'A' })
  status: string;

  @Column({ name: 'isTrash', type: 'enum', enum: ['0', '1'], default: '0' })
  is_trash: string;

  @Column({ name: 'date_added', type: 'datetime', nullable: true })
  date_added: Date;

  @Column({ name: 'last_updated', type: 'timestamp', nullable: true })
  last_updated: Date;

  @Column({ length: 50, nullable: true })
  icon: string;

  @Column({ name: 'xml_inserted', type: 'enum', enum: ['0', '1'], default: '0' })
  xml_inserted: string;
}
