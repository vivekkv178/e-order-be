import {
  Entity,
  ManyToOne,
  PrimaryColumn,
  Column,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { Order } from './order.entity';
import { Product } from './product.entity';

@Entity('order_items')
export class OrderItem {
  @PrimaryColumn('uuid')
  order_uuid: string;

  @PrimaryColumn('uuid')
  product_uuid: string;

  @Column({ generated: 'increment' })
  id: number;

  @Column()
  quantity: number;

  @ManyToOne(() => Order, (order) => order.orderItem, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'order_uuid' })
  order: Order;

  @OneToOne(() => Product, (product) => product.uuid, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'product_uuid' })
  product: Product;
}
