import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('mw_faq')
export class Faq {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  question: string;

  @Column({ type: 'text' })
  answer: string;

  @Column({ length: 50, nullable: true })
  category: string; // general, buying, selling, renting

  @Column({ type: 'tinyint', default: 1 })
  status: number;

  @Column({ type: 'int', default: 0 })
  sort_order: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
