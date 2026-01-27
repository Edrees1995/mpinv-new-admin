import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('mw_teams')
export class Team {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 255, nullable: true })
  slug: string;

  @Column({ length: 100, nullable: true })
  designation: string;

  @Column({ type: 'text', nullable: true })
  bio: string;

  @Column({ length: 255, nullable: true })
  image: string;

  @Column({ length: 255, nullable: true })
  email: string;

  @Column({ length: 50, nullable: true })
  phone: string;

  @Column({ length: 50, nullable: true })
  whatsapp: string;

  @Column({ length: 255, nullable: true })
  linkedin: string;

  @Column({ length: 255, nullable: true })
  facebook: string;

  @Column({ length: 255, nullable: true })
  instagram: string;

  @Column({ length: 255, nullable: true })
  twitter: string;

  @Column({ length: 50, nullable: true })
  languages: string; // JSON array

  @Column({ type: 'tinyint', default: 1 })
  status: number;

  @Column({ type: 'tinyint', default: 0 })
  featured: number;

  @Column({ type: 'int', default: 0 })
  sort_order: number;

  @Column({ length: 255, nullable: true })
  meta_title: string;

  @Column({ type: 'text', nullable: true })
  meta_description: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
