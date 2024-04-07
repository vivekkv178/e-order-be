import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryColumn('uuid', { default: () => 'uuid_generate_v4()' })
  uuid: string;

  @Column({ generated: 'increment' })
  id: number;

  @Column({ length: 100, unique: true, nullable: false })
  username: string;

  @Column({ length: 255, unique: true, nullable: false })
  email: string;

  @Column({ length: 255, nullable: true })
  full_name: string;

  @Column({ length: 50, default: 'USER' })
  role: string;

  @Column({ default: true })
  is_active: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}
