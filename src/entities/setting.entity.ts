import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('mw_option')
export class Setting {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  option_key: string;

  @Column({ type: 'text', nullable: true })
  option_value: string;

  @Column({ length: 50, nullable: true })
  option_group: string; // general, social, contact, seo

  @Column({ length: 50, nullable: true })
  option_type: string; // text, textarea, image, boolean

  @Column({ length: 255, nullable: true })
  label: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'int', default: 0 })
  sort_order: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
