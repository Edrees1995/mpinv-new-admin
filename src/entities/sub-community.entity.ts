import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Community } from './community.entity';

@Entity('mw_sub_community')
export class SubCommunity {
  @PrimaryGeneratedColumn({ name: 'sub_community_id' })
  id: number;

  @Column({ name: 'sub_community_name', length: 250 })
  name: string;

  @Column({ nullable: true })
  community_id: number;

  @Column({ length: 250, nullable: true })
  slug: string;

  @ManyToOne(() => Community)
  @JoinColumn({ name: 'community_id' })
  community: Community;
}
