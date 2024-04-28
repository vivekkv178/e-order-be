import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { Organization } from './organization.entity';
import { User } from './user.entity';
import { OrderItem } from './order-item.entity';

@Entity('products')
export class Product {
  @PrimaryColumn('uuid', { default: () => 'uuid_generate_v4()' })
  uuid: string;

  @Column({ generated: 'increment' })
  id: number;

  @Column()
  name: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({ default: true })
  is_active: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  @Column({ type: 'uuid' })
  org_uuid: string;

  @Column({ type: 'uuid' })
  user_uuid: string;

  @ManyToOne(() => Organization, (org) => org.product, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'org_uuid' })
  org: Organization;

  @ManyToOne(() => User, (user) => user.product, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_uuid' })
  user: User;

  @OneToOne(() => OrderItem, (orderItem) => orderItem.product, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'uuid' })
  orderItem: OrderItem;
}
