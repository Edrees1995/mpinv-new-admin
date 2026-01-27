import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Category } from './category.entity';
import { Subcategory } from './subcategory.entity';
import { Community } from './community.entity';
import { SubCommunity } from './sub-community.entity';
import { PropertyImage } from './property-image.entity';
import { PropertyAmenity } from './property-amenity.entity';
import { PropertyFaq } from './property-faq.entity';
import { PropertyFloorPlan } from './property-floor-plan.entity';

@Entity('mw_place_an_ad')
export class Property {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255, nullable: true })
  title: string;

  @Column({ length: 255, nullable: true })
  slug: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'decimal', precision: 15, scale: 2, nullable: true })
  price: number;

  @Column({ length: 50, nullable: true })
  purpose: string; // sale, rent

  @Column({ length: 50, nullable: true })
  property_type: string;

  @Column({ nullable: true })
  bedrooms: number;

  @Column({ nullable: true })
  bathrooms: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  area: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  builtup_area: number;

  @Column({ length: 255, nullable: true })
  address: string;

  @Column({ length: 100, nullable: true })
  city: string;

  @Column({ type: 'decimal', precision: 10, scale: 8, nullable: true })
  latitude: number;

  @Column({ type: 'decimal', precision: 11, scale: 8, nullable: true })
  longitude: number;

  @Column({ nullable: true })
  category_id: number;

  @Column({ nullable: true })
  subcategory_id: number;

  @Column({ nullable: true })
  community_id: number;

  @Column({ nullable: true })
  sub_community_id: number;

  @Column({ length: 255, nullable: true })
  featured_image: string;

  @Column({ length: 50, nullable: true })
  reference_no: string;

  @Column({ type: 'tinyint', default: 1 })
  status: number;

  @Column({ type: 'tinyint', default: 0 })
  featured: number;

  @Column({ type: 'tinyint', default: 0 })
  is_offplan: number;

  @Column({ length: 255, nullable: true })
  video_url: string;

  @Column({ length: 255, nullable: true })
  virtual_tour: string;

  @Column({ nullable: true })
  agent_id: number;

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
  @ManyToOne(() => Category)
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @ManyToOne(() => Subcategory)
  @JoinColumn({ name: 'subcategory_id' })
  subcategory: Subcategory;

  @ManyToOne(() => Community)
  @JoinColumn({ name: 'community_id' })
  community: Community;

  @ManyToOne(() => SubCommunity)
  @JoinColumn({ name: 'sub_community_id' })
  subCommunity: SubCommunity;

  @OneToMany(() => PropertyImage, (image) => image.property)
  images: PropertyImage[];

  @OneToMany(() => PropertyAmenity, (amenity) => amenity.property)
  amenities: PropertyAmenity[];

  @OneToMany(() => PropertyFaq, (faq) => faq.property)
  faqs: PropertyFaq[];

  @OneToMany(() => PropertyFloorPlan, (floorPlan) => floorPlan.property)
  floorPlans: PropertyFloorPlan[];
}
