import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
} from 'typeorm';

@Entity('mw_banner')
export class Banner {
  @PrimaryGeneratedColumn({ name: 'banner_id' })
  id: number;

  @Column()
  position_id: number;

  @Column({ length: 250 })
  image: string;

  @Column({ type: 'enum', enum: ['A', 'I'] })
  status: string;

  @Column({ name: 'isTrash', type: 'enum', enum: ['0', '1'], default: '0' })
  is_trash: string;

  @Column()
  priority: number;

  @Column({ name: 'link_url', length: 250 })
  link: string;

  @Column({ type: 'enum', enum: ['adImage', 'adSense'] })
  ad_type: string;

  @Column({ type: 'text' })
  script: string;
}
