import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Developer } from './developer.entity';
import { Community } from './community.entity';
import { SubCommunity } from './sub-community.entity';
import { Category } from './category.entity';
import { Subcategory } from './subcategory.entity';
import { AdImage } from './ad-image.entity';
import { AdPropertyType } from './ad-property-type.entity';
import { AdFloorPlan } from './ad-floor-plan.entity';
import { AdPaymentPlan } from './ad-payment-plan.entity';

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

  // === NEW FIELDS: Category / Classification ===
  @Column({ name: 'category_id', nullable: true })
  category_id: number;

  @Column({ name: 'sub_category_id', nullable: true })
  sub_category_id: number;

  @Column({ name: 'type_of_project', length: 1, nullable: true })
  type_of_project: string;

  @Column({ name: 'off_plan', type: 'enum', enum: ['0', '1'], nullable: true })
  off_plan: string;

  @Column({ name: 'listing_type', length: 1, nullable: true })
  listing_type: string;

  // === NEW FIELDS: Timeline / Sales ===
  @Column({ name: 'launch_date', type: 'date', nullable: true })
  launch_date: Date;

  @Column({ name: 'possession', type: 'date', nullable: true })
  possession: Date;

  @Column({ name: 'completion_date', type: 'date', nullable: true })
  completion_date: Date;

  @Column({ name: 'sale_status', length: 25, nullable: true })
  sale_status: string;

  // === NEW FIELDS: Payment Plan ===
  @Column({ name: 'pay_plan', length: 250, nullable: true })
  pay_plan: string;

  @Column({ name: 'payment_plan', type: 'blob', nullable: true })
  payment_plan: string;

  // === NEW FIELDS: Registration / Legal ===
  @Column({ name: 'rera', length: 15, nullable: true })
  rera: string;

  @Column({ name: 'RefNo', length: 20, nullable: true })
  ref_no: string;

  @Column({ name: 'ded', length: 15, nullable: true })
  ded: string;

  @Column({ name: 'brn', length: 15, nullable: true })
  brn: string;

  @Column({ name: 'qr', length: 100, nullable: true })
  qr: string;

  // === NEW FIELDS: Agent Info ===
  @Column({ name: 'agent_name', length: 150, nullable: true })
  agent_name: string;

  @Column({ name: 'agent_phone', length: 20, nullable: true })
  agent_phone: string;

  @Column({ name: 'agent_email', length: 150, nullable: true })
  agent_email: string;

  @Column({ name: 'agent_logo', length: 100, nullable: true })
  agent_logo: string;

  @Column({ name: 'mobile_number', length: 15, nullable: true })
  mobile_number: string;

  // === NEW FIELDS: SEO ===
  @Column({ name: 'meta_title', length: 250, nullable: true })
  meta_title: string;

  @Column({ name: 'meta_keywords', length: 250, nullable: true })
  meta_keywords: string;

  @Column({ name: 'meta_description', length: 250, nullable: true })
  meta_description: string;

  // === NEW FIELDS: Slider / Background Images ===
  @Column({ name: 'bg_img', length: 100, nullable: true })
  bg_img: string;

  @Column({ name: 'bg_img_mobile', length: 100, nullable: true })
  bg_img_mobile: string;

  @Column({ name: 'sliding', length: 1, nullable: true })
  sliding: string;

  @Column({ name: 'home_sliding', length: 1, nullable: true })
  home_sliding: string;

  @Column({ name: 'caption', type: 'text', nullable: true })
  caption: string;

  @Column({ name: 'd_right', length: 100, nullable: true })
  d_right: string;

  @Column({ name: 'bg_attachment1', length: 100, nullable: true })
  bg_attachment1: string;

  @Column({ name: 'bg_attachment2', length: 100, nullable: true })
  bg_attachment2: string;

  // === NEW FIELDS: Additional Details ===
  @Column({ name: 'parking', length: 5, nullable: true })
  parking: string;

  @Column({ name: 'furnished', length: 10, nullable: true })
  furnished: string;

  @Column({ name: 'currency_abr', length: 10, nullable: true })
  currency_abr: string;

  @Column({ name: 'area_measurement', length: 10, nullable: true })
  area_measurement: string;

  @Column({ name: 'area_unit', nullable: true })
  area_unit: number;

  // Relations
  @ManyToOne(() => Developer)
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

  @ManyToOne(() => Subcategory)
  @JoinColumn({ name: 'sub_category_id' })
  subcategory: Subcategory;

  @OneToMany(() => AdImage, (image) => image.project)
  images: AdImage[];

  @OneToMany(() => AdPropertyType, (propertyType) => propertyType.project)
  propertyTypes: AdPropertyType[];

  @OneToMany(() => AdFloorPlan, (floorPlan) => floorPlan.project)
  floorPlans: AdFloorPlan[];

  @OneToMany(() => AdPaymentPlan, (paymentPlan) => paymentPlan.project)
  paymentPlans: AdPaymentPlan[];
}
