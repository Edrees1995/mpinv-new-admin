import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('mw_article')
export class Article {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  title: string;

  @Column({ length: 255, nullable: true })
  slug: string;

  @Column({ type: 'text', nullable: true })
  excerpt: string;

  @Column({ type: 'longtext', nullable: true })
  content: string;

  @Column({ length: 255, nullable: true })
  featured_image: string;

  @Column({ nullable: true })
  author_id: number;

  @Column({ nullable: true })
  category_id: number;

  @Column({ type: 'text', nullable: true })
  tags: string; // JSON array

  @Column({ type: 'int', default: 0 })
  views: number;

  @Column({ type: 'tinyint', default: 1 })
  status: number;

  @Column({ type: 'tinyint', default: 0 })
  featured: number;

  @Column({ type: 'datetime', nullable: true })
  published_at: Date;

  @Column({ length: 255, nullable: true })
  meta_title: string;

  @Column({ type: 'text', nullable: true })
  meta_description: string;

  @Column({ type: 'text', nullable: true })
  meta_keywords: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
