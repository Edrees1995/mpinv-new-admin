import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Property } from './property.entity';

@Entity('mw_ad_floor_plan')
export class PropertyFloorPlan {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  ad_id: number;

  @Column({ length: 255, nullable: true })
  title: string;

  @Column({ length: 255 })
  image: string;

  @Column({ nullable: true })
  bedrooms: number;

  @Column({ nullable: true })
  bathrooms: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  area: number;

  @Column({ type: 'decimal', precision: 15, scale: 2, nullable: true })
  price: number;

  @Column({ type: 'int', default: 0 })
  sort_order: number;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => Property, (property) => property.floorPlans)
  @JoinColumn({ name: 'ad_id' })
  property: Property;
}
