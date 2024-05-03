import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../entities/product.entity';
import { DATABASE_OPENAPI } from 'src/core/config/databases';
import { CreateProductDto, UpdateProductDto } from '../dto/product.dto';
import { instanceToPlain } from 'class-transformer';
import { AuthDetailsObject } from 'src/core/guards/auth/auth-details-object';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product, DATABASE_OPENAPI)
    private readonly productsRepository: Repository<Product>,
  ) {}

  async findAll(): Promise<Product[]> {
    return this.productsRepository.find({
      order: {
        id: 'ASC',
      },
    });
  }

  async findAllByOrgId(authDetails: AuthDetailsObject): Promise<Product[]> {
    return this.productsRepository.find({
      where: {
        org_uuid: authDetails.org_uuid,
      },
      order: {
        id: 'ASC',
      },
    });
  }

  async findById(id: string): Promise<Product> {
    return this.productsRepository.findOne({
      where: {
        uuid: id,
      },
    });
  }

  async create(
    authDetails: AuthDetailsObject,
    productData: CreateProductDto,
  ): Promise<any> {
    const data = instanceToPlain(productData);
    data.org_uuid = authDetails.org_uuid;
    data.user_uuid = authDetails.uuid;
    const newProducts = this.productsRepository.create(data);
    return this.productsRepository.save(newProducts);
  }

  async update(productData: UpdateProductDto): Promise<Product> {
    const data = instanceToPlain(productData);
    await this.productsRepository.update(data.uuid, data);
    return this.findById(`${data.uuid}`);
  }

  async delete(id: string): Promise<void> {
    await this.productsRepository.delete(id);
  }
}
