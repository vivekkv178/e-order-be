import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../entities/product.entity';
import { DATABASE_OPENAPI } from 'src/core/config/databases';
import { CreateProductDto, UpdateProductDto } from '../dto/product.dto';
import { instanceToPlain } from 'class-transformer';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product, DATABASE_OPENAPI)
    private readonly productsRepository: Repository<Product>,
  ) {}

  async findAll(): Promise<Product[]> {
    return this.productsRepository.find();
  }

  async findById(id: string): Promise<Product> {
    return this.productsRepository.findOne({
      where: {
        product_uuid: id,
      },
    });
  }

  async create(productData: CreateProductDto): Promise<any> {
    const data = instanceToPlain(productData);
    const newProducts = this.productsRepository.create(data);
    return this.productsRepository.save(newProducts);
  }

  async update(productData: UpdateProductDto): Promise<Product> {
    const data = instanceToPlain(productData);
    await this.productsRepository.update(data.product_uuid, data);
    return this.findById(`${data.product_uuid}`);
  }

  async delete(id: string): Promise<void> {
    await this.productsRepository.delete(id);
  }
}
