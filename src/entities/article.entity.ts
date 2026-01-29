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

  @Column({ length: 20, nullable: true })
  phone: string;

  @Column({ length: 20, nullable: true })
  mobile: string;

  @Column({ name: 'f_type', length: 2, nullable: true })
  type: string;

  @Column({ length: 250, nullable: true })
  linked_in: string;

  @Column({ length: 100, nullable: true })
  profile_banner: string;

  @Column({ length: 200, nullable: true })
  twitter: string;

  @Column({ length: 200, nullable: true })
  insta: string;

  @Column({ length: 200, nullable: true })
  telegram: string;

  @Column({ length: 250, nullable: true })
  facebook: string;

  @Column({ nullable: true })
  team_user: number;

  @Column({ length: 250, nullable: true })
  team_type: string;

  @Column({ length: 50, nullable: true })
  reading_time: string;

  @Column({ length: 150, nullable: true })
  image2: string;

  @Column({ length: 150, nullable: true })
  image3: string;

  @Column({ length: 150, nullable: true })
  image4: string;

  @Column({ nullable: true })
  parent_article: number;

  @Column({ length: 3, nullable: true })
  language: string;

  @Column({ nullable: true })
  community_id: number;

  @Column({ name: 'subcomunity_id', nullable: true })
  subcommunity_id: number;
}
