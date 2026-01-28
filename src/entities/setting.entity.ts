import {
  Entity,
  Column,
  PrimaryColumn,
} from 'typeorm';

@Entity('mw_option')
export class Setting {
  @PrimaryColumn({ length: 100 })
  category: string;

  @PrimaryColumn({ name: 'key', length: 100 })
  option_key: string;

  @Column({ name: 'value', type: 'longblob' })
  option_value: Buffer;

  @Column({ type: 'tinyint', default: 0 })
  is_serialized: number;

  @Column({ type: 'datetime' })
  date_added: Date;

  @Column({ type: 'datetime' })
  last_updated: Date;
}
