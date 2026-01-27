import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Property } from './property.entity';
import { Amenity } from './amenity.entity';

@Entity('mw_ad_amenities')
export class PropertyAmenity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  ad_id: number;

  @Column({ nullable: true })
  amenity_id: number;

  @ManyToOne(() => Property, (property) => property.amenities)
  @JoinColumn({ name: 'ad_id' })
  property: Property;

  @ManyToOne(() => Amenity)
  @JoinColumn({ name: 'amenity_id' })
  amenity: Amenity;
}
