import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Organization } from './organization.entity';
import { Product } from './product.entity';
import { Order } from './order.entity';

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

  @Column({ default: false })
  is_admin: boolean;

  @Column({ default: false })
  is_org_user: boolean;

  @Column({ default: false })
  is_org_admin: boolean;

  @Column({ default: false })
  is_customer: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  @Column({ type: 'uuid' })
  org_uuid: string;

  @ManyToOne(() => Organization, (org) => org.user, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'org_uuid' })
  org: Organization;

  @OneToMany(() => Product, (product) => product.user)
  product: Product[];

  @OneToMany(() => Order, (order) => order.user)
  order: Order[];
}
