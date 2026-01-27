import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Developer } from './developer.entity';
import { Community } from './community.entity';
import { SubCommunity } from './sub-community.entity';
import { Category } from './category.entity';

@Entity('mw_projectlist')
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  name: string;

  @Column({ length: 255, nullable: true })
  slug: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'text', nullable: true })
  short_description: string;

  @Column({ nullable: true })
  developer_id: number;

  @Column({ nullable: true })
  community_id: number;

  @Column({ nullable: true })
  sub_community_id: number;

  @Column({ nullable: true })
  category_id: number;

  @Column({ length: 255, nullable: true })
  featured_image: string;

  @Column({ type: 'text', nullable: true })
  gallery: string; // JSON array of images

  @Column({ type: 'decimal', precision: 15, scale: 2, nullable: true })
  starting_price: number;

  @Column({ type: 'decimal', precision: 15, scale: 2, nullable: true })
  price: number;

  @Column({ length: 50, nullable: true })
  bedrooms: string; // Can be range like "1-4"

  @Column({ length: 50, nullable: true })
  bathrooms: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  builtup_area: number;

  @Column({ length: 100, nullable: true })
  project_status: string; // Under Construction, Ready, etc.

  @Column({ length: 100, nullable: true })
  completion_date: string;

  @Column({ type: 'text', nullable: true })
  payment_plan: string;

  @Column({ type: 'text', nullable: true })
  highlights: string; // JSON array

  @Column({ type: 'text', nullable: true })
  amenities: string; // JSON array of amenity IDs

  @Column({ type: 'decimal', precision: 10, scale: 8, nullable: true })
  latitude: number;

  @Column({ type: 'decimal', precision: 11, scale: 8, nullable: true })
  longitude: number;

  @Column({ length: 255, nullable: true })
  address: string;

  @Column({ length: 255, nullable: true })
  video_url: string;

  @Column({ length: 255, nullable: true })
  virtual_tour: string;

  @Column({ length: 255, nullable: true })
  brochure: string;

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

  @Column({ type: 'text', nullable: true })
  meta_keywords: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  // Relations
  @ManyToOne(() => Developer, (developer) => developer.projects)
  @JoinColumn({ name: 'developer_id' })
  developer: Developer;

  @ManyToOne(() => Community)
  @JoinColumn({ name: 'community_id' })
  community: Community;

  @ManyToOne(() => SubCommunity)
  @JoinColumn({ name: 'sub_community_id' })
  subCommunity: SubCommunity;

  @ManyToOne(() => Category)
  @JoinColumn({ name: 'category_id' })
  category: Category;
}
