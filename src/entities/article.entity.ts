import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
} from 'typeorm';

@Entity('mw_article')
export class Article {
  @PrimaryGeneratedColumn({ name: 'article_id' })
  id: number;

  @Column({ length: 200 })
  title: string;

  @Column({ name: 'sub_title', length: 200, nullable: true })
  subtitle: string;

  @Column({ length: 255 })
  slug: string;

  @Column({ type: 'longtext' })
  content: string;

  @Column({ length: 15, default: 'published' })
  status: string;

  @Column({ type: 'datetime' })
  date_added: Date;

  @Column({ type: 'datetime' })
  last_updated: Date;

  @Column({ type: 'text' })
  page_title: string;

  @Column({ type: 'text' })
  meta_title: string;

  @Column({ type: 'text' })
  meta_description: string;

  @Column({ type: 'text' })
  meta_keywords: string;

  @Column({ nullable: true })
  priority: number;

  @Column({ length: 150, nullable: true })
  youtube_url: string;

  @Column({ length: 100, nullable: true })
  banner: string;

  @Column({ length: 50, nullable: true })
  reading_time: string;

  @Column({ length: 150, nullable: true })
  image2: string;

  @Column({ length: 150, nullable: true })
  image3: string;

  @Column({ length: 150, nullable: true })
  image4: string;

  @Column({ nullable: true })
  community_id: number;

  @Column({ name: 'subcomunity_id', nullable: true })
  subcommunity_id: number;
}
