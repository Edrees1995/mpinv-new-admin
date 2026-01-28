import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { OffplanProject } from './offplan-project.entity';

@Entity('mw_ad_image')
export class AdImage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'ad_id' })
  ad_id: number;

  @Column({ name: 'image_name', length: 250 })
  image_name: string;

  @Column({ nullable: true })
  priority: number;

  @Column({ name: 'isTrash', type: 'enum', enum: ['0', '1'], default: '0' })
  is_trash: string;

  @Column({ type: 'enum', enum: ['A', 'I'], default: 'A' })
  status: string;

  @Column({ name: 'xml_image', length: 400, nullable: true })
  xml_image: string;

  @Column({ name: 'image_type', length: 10, nullable: true })
  image_type: string;

  @Column({ name: 'Title', length: 250, nullable: true })
  title: string;

  @Column({ name: 'IsMarketingImage', length: 10, nullable: true })
  is_marketing_image: string;

  @Column({ name: 'ImageRemarks', type: 'text', nullable: true })
  image_remarks: string;

  // Relation to project
  @ManyToOne(() => OffplanProject, (project) => project.images)
  @JoinColumn({ name: 'ad_id' })
  project: OffplanProject;
}
