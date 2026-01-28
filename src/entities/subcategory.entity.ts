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

  @Column({ length: 260 })
  slug: string;

  @Column({ type: 'enum', enum: ['A', 'I'], default: 'A' })
  status: string;

  @Column({ name: 'isTrash', type: 'enum', enum: ['0', '1'], default: '0' })
  is_trash: string;

  @ManyToOne(() => Category)
  @JoinColumn({ name: 'category_id' })
  category: Category;
}
