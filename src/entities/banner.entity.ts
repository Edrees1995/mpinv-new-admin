import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('mw_banner')
export class Banner {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255, nullable: true })
  title: string;

  @Column({ type: 'text', nullable: true })
  subtitle: string;

  @Column({ length: 255 })
  image: string;

  @Column({ length: 255, nullable: true })
  mobile_image: string;

  @Column({ length: 500, nullable: true })
  link: string;

  @Column({ length: 50, nullable: true })
  link_target: string; // _self, _blank

  @Column({ length: 100, nullable: true })
  button_text: string;

  @Column({ length: 50 })
  position: string; // home-hero, home-cta, etc.

  @Column({ type: 'tinyint', default: 1 })
  status: number;

  @Column({ type: 'int', default: 0 })
  sort_order: number;

  @Column({ type: 'date', nullable: true })
  start_date: Date;

  @Column({ type: 'date', nullable: true })
  end_date: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
