import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';
import { SubCommunity } from './sub-community.entity';

@Entity('mw_community')
export class Community {
  @PrimaryGeneratedColumn({ name: 'community_id' })
  id: number;

  @Column({ name: 'community_name', length: 250 })
  name: string;

  @Column({ nullable: true })
  stateid: number;

  @Column({ nullable: true })
  district_id: number;

  @Column({ nullable: true })
  city_id: number;

  @Column({ name: 'HaveSubComm', length: 5, default: '0' })
  has_sub_communities: string;

  @Column({ length: 250, nullable: true })
  slug: string;

  @Column({ length: 150, nullable: true })
  meta_title: string;

  @Column({ length: 255, nullable: true })
  meta_description: string;

  @Column({ length: 1, nullable: true })
  highend: string;

  @Column({ length: 1, nullable: true })
  featured: string;

  @Column({ nullable: true })
  priority: number;

  @Column({ length: 150, nullable: true })
  image: string;

  @Column({ length: 150, nullable: true })
  image2: string;

  // Relations
  @OneToMany(() => SubCommunity, (sub) => sub.community)
  subCommunities: SubCommunity[];
}
