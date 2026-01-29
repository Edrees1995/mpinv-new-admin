import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Category } from './category.entity';

@Entity('mw_subcategory')
export class Subcategory {
  @PrimaryGeneratedColumn({ name: 'sub_category_id' })
  id: number;

  @Column({ name: 'section_id', nullable: true })
  section_id: number;

  @Column({ nullable: true })
  category_id: number;

  @Column({ name: 'sub_category_name', length: 250 })
  name: string;

  @Column({ name: 'amenities_required', type: 'enum', enum: ['N', 'Y'], default: 'N' })
  amenities_required: string;

  @Column({ default: 0 })
  priority: number;

  @Column({ length: 260 })
  slug: string;

  @Column({ type: 'enum', enum: ['A', 'I'], default: 'A' })
  status: string;

  @Column({ name: 'isTrash', type: 'enum', enum: ['0', '1'], default: '0' })
  is_trash: string;

  @Column({ name: 'date_added', type: 'datetime', nullable: true })
  date_added: Date;

  @Column({ name: 'last_updated', type: 'timestamp', nullable: true })
  last_updated: Date;

  @Column({ name: 'change_parent_fields', type: 'enum', enum: ['N', 'Y'], default: 'N' })
  change_parent_fields: string;

  @Column({ name: 'xml_inserted', type: 'enum', enum: ['0', '1'], default: '0' })
  xml_inserted: string;

  @ManyToOne(() => Category)
  @JoinColumn({ name: 'category_id' })
  category: Category;
}
