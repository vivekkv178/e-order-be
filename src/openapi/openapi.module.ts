import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DATABASE_OPENAPI } from 'src/core/config/databases';
import { OrganizationsController } from './organizations/organizations.controller';
import { OrganizationsService } from './organizations/organizations.service';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { User } from './entities/user.entity';
import { Organization } from './entities/organization.entity';
import { ProductsController } from './products/products.controller';
import { ProductsService } from './products/products.service';
import { Product } from './entities/product.entity';
import { Order } from './entities/order.entity';
import { OrdersController } from './orders/orders.controller';
import { OrdersService } from './orders/orders.service';
import { OrderItem } from './entities/order-item.entity';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature(
      [Organization, User, Product, Order, OrderItem],
      DATABASE_OPENAPI,
    ),
    JwtModule,
  ],
  controllers: [
    OrganizationsController,
    UsersController,
    ProductsController,
    OrdersController,
  ],
  providers: [
    OrganizationsService,
    UsersService,
    ProductsService,
    OrdersService,
    JwtService,
  ],
})
export class OpenApiModule {}
