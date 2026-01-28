import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { OffplanProject } from './offplan-project.entity';

@Entity('mw_ad_payment_plan')
export class AdPaymentPlan {
  @PrimaryColumn({ name: 'ad_id' })
  ad_id: number;

  @PrimaryColumn({ name: 'row_id' })
  row_id: number;

  @Column({ length: 250 })
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ nullable: true })
  priority: number;

  // Relation to project
  @ManyToOne(() => OffplanProject, (project) => project.paymentPlans)
  @JoinColumn({ name: 'ad_id' })
  project: OffplanProject;
}
