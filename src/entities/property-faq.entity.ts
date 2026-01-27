import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Property } from './property.entity';

@Entity('mw_ad_faq')
export class PropertyFaq {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  ad_id: number;

  @Column({ length: 500 })
  question: string;

  @Column({ type: 'text' })
  answer: string;

  @Column({ type: 'int', default: 0 })
  sort_order: number;

  @Column({ type: 'tinyint', default: 1 })
  status: number;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => Property, (property) => property.faqs)
  @JoinColumn({ name: 'ad_id' })
  property: Property;
}
