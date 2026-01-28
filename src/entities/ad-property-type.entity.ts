import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { OffplanProject } from './offplan-project.entity';

@Entity('mw_ad_property_types')
export class AdPropertyType {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ name: 'ad_id', nullable: true })
  ad_id: number;

  @Column({ name: 'type_id', nullable: true })
  type_id: number;

  @Column({ default: 0 })
  bed: number;

  @Column({ default: 0 })
  bath: number;

  @Column({ length: 250, nullable: true })
  title: string;

  @Column({ name: 'from_price', type: 'decimal', precision: 14, scale: 2, nullable: true })
  from_price: number;

  @Column({ name: 'to_price', type: 'decimal', precision: 14, scale: 2, nullable: true })
  to_price: number;

  @Column({ type: 'decimal', precision: 14, scale: 2, default: 0 })
  size: number;

  @Column({ name: 'size_to', type: 'decimal', precision: 14, scale: 2, default: 0 })
  size_to: number;

  @Column({ name: 'last_updated', type: 'datetime', nullable: true })
  last_updated: Date;

  @Column({ name: 'area_unit', nullable: true })
  area_unit: number;

  @Column({ name: 'price_unit', nullable: true })
  price_unit: number;

  @Column({ length: 250, nullable: true })
  description: string;

  @Column({ length: 50, nullable: true })
  image: string;

  @Column({ length: 1, nullable: true })
  usage: string;

  @Column({ name: 'primary_unit_view', length: 250, nullable: true })
  primary_unit_view: string;

  @Column({ name: 'floor_plan', length: 150, nullable: true })
  floor_plan: string;

  // Relation to project
  @ManyToOne(() => OffplanProject, (project) => project.propertyTypes)
  @JoinColumn({ name: 'ad_id' })
  project: OffplanProject;
}
