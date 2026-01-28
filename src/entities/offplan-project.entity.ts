import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Developer } from './developer.entity';
import { Community } from './community.entity';

@Entity('mw_place_an_ad')
export class OffplanProject {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'section_id', nullable: true })
  section_id: number;

  @Column({ name: 'ad_title', length: 250 })
  name: string;

  @Column({ length: 250 })
  slug: string;

  @Column({ name: 'ad_description', type: 'text', nullable: true })
  description: string;

  @Column({ name: 'ad_short_description', type: 'text', nullable: true })
  short_description: string;

  @Column({ name: 'image_file', length: 250, nullable: true })
  featured_image: string;

  @Column({ type: 'decimal', precision: 14, scale: 2, nullable: true })
  price: number;

  @Column({ length: 3, nullable: true })
  bedrooms: string;

  @Column({ length: 3, nullable: true })
  bathrooms: string;

  @Column({ name: 'builtup_area', length: 20, nullable: true })
  size: string;

  @Column({ name: 'plot_size', length: 20, nullable: true })
  plot_size: string;

  @Column({ name: 'no_of_units', length: 15, nullable: true })
  no_of_units: string;

  @Column({ name: 'developer_id', nullable: true })
  developer_id: number;

  @Column({ name: 'd_name', length: 250, nullable: true })
  developer_name: string;

  @Column({ name: 'd_logo', length: 100, nullable: true })
  developer_logo: string;

  @Column({ name: 'd_description', type: 'text', nullable: true })
  developer_description: string;

  @Column({ name: 'community_id', nullable: true })
  community_id: number;

  @Column({ name: 'sub_community_id', nullable: true })
  sub_community_id: number;

  @Column({ name: 'property_name', length: 250, nullable: true })
  property_name: string;

  @Column({ name: 'location_latitude', length: 150, nullable: true })
  latitude: string;

  @Column({ name: 'location_longitude', length: 150, nullable: true })
  longitude: string;

  @Column({ name: 'HandoverDate', type: 'date', nullable: true })
  handover_date: Date;

  @Column({ name: 'completion_year', length: 150, nullable: true })
  completion_year: string;

  @Column({ name: 'project_status', length: 25, nullable: true })
  project_status: string;

  @Column({ name: 'construction_status', length: 1, nullable: true })
  construction_status: string;

  @Column({ type: 'enum', enum: ['A', 'I'], default: 'A' })
  status: string;

  @Column({ name: 'isTrash', type: 'enum', enum: ['0', '1'], default: '0' })
  is_trash: string;

  @Column({ type: 'enum', enum: ['N', 'Y'], default: 'N' })
  featured: string;

  @Column({ name: 'youtube_url', length: 150, nullable: true })
  youtube_url: string;

  @Column({ name: 'v_link', length: 150, nullable: true })
  video_link: string;

  @Column({ name: 'floor_pdf', length: 100, nullable: true })
  floor_pdf: string;

  @Column({ name: 'payment_pdf', length: 100, nullable: true })
  payment_pdf: string;

  @Column({ name: 'broucher', length: 100, nullable: true })
  brochure: string;

  @Column({ name: 'PDFBrochureLink', type: 'text', nullable: true })
  brochure_link: string;

  @Column({ name: 'project_highlights', type: 'longtext', nullable: true })
  highlights: string;

  @Column({ name: 'date_added', type: 'datetime' })
  created_at: Date;

  @Column({ name: 'last_updated', type: 'timestamp' })
  updated_at: Date;

  // Relations
  @ManyToOne(() => Developer)
  @JoinColumn({ name: 'developer_id' })
  developer: Developer;

  @ManyToOne(() => Community)
  @JoinColumn({ name: 'community_id' })
  community: Community;
}
