import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Property } from './property.entity';

@Entity('mw_ad_image')
export class PropertyImage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  ad_id: number;

  @Column({ length: 255 })
  image: string;

  @Column({ length: 255, nullable: true })
  thumbnail: string;

  @Column({ length: 255, nullable: true })
  alt_text: string;

  @Column({ type: 'int', default: 0 })
  sort_order: number;

  @Column({ type: 'tinyint', default: 0 })
  is_featured: number;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => Property, (property) => property.images)
  @JoinColumn({ name: 'ad_id' })
  property: Property;
}
