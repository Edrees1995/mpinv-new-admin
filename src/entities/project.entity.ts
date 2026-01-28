import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Developer } from './developer.entity';

@Entity('mw_projectlist')
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 250 })
  name: string;

  @Column({ name: 'short_desc', type: 'text', nullable: true })
  description: string;

  @Column({ name: 'f_img', type: 'text', nullable: true })
  featured_image: string;

  @Column({ type: 'text', nullable: true })
  list: string; // JSON data

  @Column({ type: 'text', nullable: true })
  property: string; // JSON data

  @Column({ length: 100 })
  status: string;

  @Column({ length: 100 })
  trash: string;

  @Column({ name: 'dev_id', nullable: true })
  developer_id: number;

  @Column({ name: 'created', type: 'datetime' })
  created_at: Date;

  @Column({ name: 'updated', type: 'datetime', nullable: true })
  updated_at: Date;

  // Relations
  @ManyToOne(() => Developer)
  @JoinColumn({ name: 'dev_id' })
  developer: Developer;
}
