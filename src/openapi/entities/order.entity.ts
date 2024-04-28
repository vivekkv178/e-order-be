import {
  Entity,
  Column,
  CreateDateColumn,
  ManyToOne,
  PrimaryColumn,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { User } from './user.entity';
import { OrderItem } from './order-item.entity';

@Entity('orders')
export class Order {
  @PrimaryColumn('uuid', { default: () => 'uuid_generate_v4()' })
  uuid: string;

  @Column({ generated: 'increment' })
  id: number;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  order_date: Date;

  @Column({ type: 'uuid' })
  user_uuid: string;

  @ManyToOne(() => User, (user) => user.order, { cascade: true })
  @JoinColumn({ name: 'user_uuid' })
  user: User;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order)
  orderItem: OrderItem[];
}
