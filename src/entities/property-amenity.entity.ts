import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Amenity } from './amenity.entity';

@Entity('mw_ad_amenities')
export class PropertyAmenity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  ad_id: number;

  @Column({ nullable: true })
  amenity_id: number;

  @ManyToOne(() => Amenity)
  @JoinColumn({ name: 'amenity_id' })
  amenity: Amenity;
}
