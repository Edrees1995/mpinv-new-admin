import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('mw_amenities')
export class Amenity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  name: string;

  @Column({ length: 255, nullable: true })
  slug: string;

  @Column({ length: 255, nullable: true })
  icon: string;

  @Column({ length: 50, nullable: true })
  icon_type: string; // font-awesome, image, svg

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ length: 50, nullable: true })
  category: string; // property, project, both

  @Column({ type: 'tinyint', default: 1 })
  status: number;

  @Column({ type: 'int', default: 0 })
  sort_order: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
