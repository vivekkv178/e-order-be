import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from '../entities/order.entity';
import { DATABASE_OPENAPI } from 'src/core/config/databases';
import { CreateOrderDto, UpdateOrderDto } from '../dto/order.dto';
import { instanceToPlain } from 'class-transformer';
import { OrderItem } from '../entities/order-item.entity';
import { AuthDetailsObject } from 'src/core/guards/auth/auth-details-object';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order, DATABASE_OPENAPI)
    private readonly ordersRepository: Repository<Order>,
    @InjectRepository(OrderItem, DATABASE_OPENAPI)
    private readonly orderItemsRepository: Repository<OrderItem>,
  ) {}

  async findAll(): Promise<Order[]> {
    return this.ordersRepository.find({
      relations: ['orderItem', 'orderItem.product'],
    });
  }

  async findById(id: string): Promise<Order> {
    return this.ordersRepository.findOne({
      where: {
        uuid: id,
      },
      relations: ['orderItem'],
    });
  }

  async create(
    authDetails: AuthDetailsObject,
    orderData: CreateOrderDto,
  ): Promise<any> {
    const data = instanceToPlain(orderData);
    data.user_uuid = authDetails.uuid;
    const newOrder = this.ordersRepository.create(data);
    const savedOrder = await this.ordersRepository.save(newOrder);

    for (const itemData of orderData.order_items) {
      const newItem = this.orderItemsRepository.create({
        order_uuid: savedOrder.uuid,
        product_uuid: itemData?.uuid,
        quantity: itemData?.quantity,
      });
      await this.orderItemsRepository.save(newItem);
    }

    return savedOrder;
  }

  async update(orderData: UpdateOrderDto): Promise<Order> {
    const data = instanceToPlain(orderData);
    await this.ordersRepository.update(data.order_uuid, data);
    return this.findById(`${data.order_uuid}`);
  }

  async delete(id: string): Promise<void> {
    await this.ordersRepository.delete(id);
  }
}
