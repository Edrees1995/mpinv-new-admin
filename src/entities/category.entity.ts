import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
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

  @Column({ length: 250 })
  slug: string;

  @Column({ type: 'enum', enum: ['A', 'I'], default: 'A' })
  status: string;

  @Column({ name: 'isTrash', type: 'enum', enum: ['0', '1'], default: '0' })
  is_trash: string;

  @Column({ length: 50, nullable: true })
  icon: string;
}
