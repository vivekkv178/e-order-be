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

@Module({
  imports: [
    TypeOrmModule.forFeature([Organization, User, Product], DATABASE_OPENAPI),
  ],
  controllers: [OrganizationsController, UsersController, ProductsController],
  providers: [OrganizationsService, UsersService, ProductsService],
})
export class OpenApiModule {}
