import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
} from 'typeorm';

@Entity('mw_amenities')
export class Amenity {
  @PrimaryGeneratedColumn({ name: 'amenities_id' })
  id: number;

  @Column({ length: 2, nullable: true })
  code: string;

  @Column({ name: 'amenities_name', length: 250 })
  name: string;

  @Column({ name: 'isTrash', type: 'enum', enum: ['0', '1'], default: '0' })
  is_trash: string;

  @Column({ type: 'enum', enum: ['A', 'I'], default: 'A' })
  status: string;

  @Column({ default: 0 })
  priority: number;

  @Column({ name: 'Title', length: 250, nullable: true })
  title: string;

  @Column({ nullable: true })
  f_type: number;

  @Column({ length: 60, nullable: true })
  icon_list: string;
}
