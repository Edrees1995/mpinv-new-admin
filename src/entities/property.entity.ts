import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Category } from './category.entity';
import { Community } from './community.entity';

@Entity('mw_place_an_ad')
export class Property {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'ad_title', length: 250 })
  title: string;

  @Column({ length: 250, nullable: true })
  slug: string;

  @Column({ name: 'ad_description', type: 'text', nullable: true })
  description: string;

  @Column({ name: 'ad_short_description', type: 'text', nullable: true })
  short_description: string;

  @Column({ type: 'decimal', precision: 14, scale: 2 })
  price: number;

  @Column({ name: 'listing_type', length: 1, nullable: true })
  purpose: string; // sale, rent

  @Column({ nullable: true })
  bedrooms: string;

  @Column({ nullable: true })
  bathrooms: string;

  @Column({ nullable: true })
  category_id: number;

  @Column({ name: 'sub_category_id', nullable: true })
  subcategory_id: number;

  @Column({ nullable: true })
  country: number;

  @Column({ nullable: true })
  state: number;

  @Column({ nullable: true })
  city: number;

  @Column({ nullable: true })
  district: number;

  @Column({ name: 'location_latitude', length: 150, nullable: true })
  latitude: string;

  @Column({ name: 'location_longitude', length: 150, nullable: true })
  longitude: string;

  @Column({ name: 'mobile_number', length: 15, nullable: true })
  phone: string;

  @Column({ nullable: true })
  user_id: number;

  @Column({ type: 'enum', enum: ['A', 'I'], default: 'A' })
  status: string;

  @Column({ name: 'isTrash', type: 'enum', enum: ['0', '1'], default: '0' })
  is_trash: string;

  @Column({ default: 0 })
  priority: number;

  @Column({ name: 'date_added', type: 'datetime' })
  created_at: Date;

  @Column({ name: 'last_updated', type: 'timestamp' })
  updated_at: Date;

  // Relations
  @ManyToOne(() => Category)
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @ManyToOne(() => Community)
  @JoinColumn({ name: 'city' })
  community: Community;
}
