import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';
import { Project } from './project.entity';

@Entity('mw_developers')
export class Developer {
  @PrimaryGeneratedColumn({ name: 'developer_id' })
  id: number;

  @Column({ name: 'developer_name', length: 250 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ length: 250, nullable: true })
  logo: string;

  @Column({ type: 'enum', enum: ['A', 'I'], default: 'A' })
  status: string;

  @Column({ name: 'isTrash', type: 'enum', enum: ['0', '1'], default: '0' })
  is_trash: string;

  @Column({ name: 'link_url', length: 250, nullable: true })
  website: string;

  @Column({ length: 250, nullable: true })
  slug: string;

  @Column({ length: 1, nullable: true })
  featured: string;

  @Column({ nullable: true })
  priority: number;

  @Column({ length: 20, nullable: true })
  phone: string;

  @Column({ length: 150, nullable: true })
  email: string;

  @Column({ length: 255, nullable: true })
  address: string;

  @Column({ name: 'show_home', length: 1, nullable: true })
  show_on_home: string;

  @Column({ name: 'added_date', type: 'timestamp' })
  created_at: Date;

  // Relations
  @OneToMany(() => Project, (project) => project.developer)
  projects: Project[];
}
