import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

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
}
