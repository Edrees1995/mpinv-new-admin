import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { OffplanProject } from './offplan-project.entity';

@Entity('mw_ad_floor_plan')
export class AdFloorPlan {
  @PrimaryColumn({ name: 'floor_id' })
  floor_id: number;

  @PrimaryColumn({ name: 'ad_id' })
  ad_id: number;

  @Column({ name: 'floor_title', length: 250, nullable: true })
  floor_title: string;

  @Column({ name: 'floor_file', length: 250, nullable: true })
  floor_file: string;

  // Relation to project
  @ManyToOne(() => OffplanProject, (project) => project.floorPlans)
  @JoinColumn({ name: 'ad_id' })
  project: OffplanProject;
}
