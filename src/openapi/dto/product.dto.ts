import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsNumber,
  IsBoolean,
  IsUUID,
} from 'class-validator';

export class CreateProductDto {
  @ApiProperty({
    description: 'Name of the product',
    example: 'Awesome Product',
  })
  @IsNotEmpty()
  @IsString()
  @Expose()
  name: string;

  @ApiPropertyOptional({
    description: 'Description of the product',
    example: 'Product Description',
  })
  @IsOptional()
  @IsString()
  @Expose()
  description?: string;

  @ApiProperty({ description: 'Price of the product', example: 100.5 })
  @IsNotEmpty()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Expose()
  price: number;

  @ApiPropertyOptional({
    description: 'Status of product availability',
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  @Expose()
  is_active?: boolean;
}

export class UpdateProductDto {
  @ApiProperty({
    example: 'c7b5a694-d5ff-4d0c-bcd0-8e0af25f1bfc',
    description: 'The UUID of the organization',
  })
  @IsUUID()
  @Expose()
  product_uuid?: string;

  @ApiPropertyOptional({
    description: 'Updated name of the product',
    example: 'Updated Product',
  })
  @IsOptional()
  @IsString()
  @Expose()
  name?: string;

  @ApiPropertyOptional({
    description: 'Updated description of the product',
    example: 'Updated description',
  })
  @IsOptional()
  @IsString()
  @Expose()
  description?: string;

  @ApiPropertyOptional({
    description: 'Updated price of the product',
    example: 150,
  })
  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Expose()
  price?: number;

  @ApiPropertyOptional({
    description: 'Updated status of product availability',
    example: false,
  })
  @IsOptional()
  @IsBoolean()
  @Expose()
  is_active?: boolean;
}

export class GetProductDto {
  @ApiProperty({ description: 'UUID of the product to retrieve', example: 1 })
  @IsNotEmpty()
  @IsUUID()
  @Expose()
  uuid: string;
}

export class DeleteProductDto {
  @ApiProperty({ description: 'UUID of the product to delete', example: 1 })
  @IsNotEmpty()
  @IsNumber()
  @Expose()
  uuid: string;
}

export class CreateProdcutSuccess {
  @ApiPropertyOptional({
    description: 'Success Message',
    example: 'Product Added Successfully.',
  })
  message: string;
}

export class CreateProdcutDuplicateError {
  @ApiPropertyOptional({
    description: 'Error Message',
    example: 'Product Name already exists.',
  })
  message: string;
  @ApiPropertyOptional({
    description: 'Ecomm Error Code',
    example: 'ECOMM_ERR_ORG_100',
  })
  ecommErrorCode: string;
}

export class CreateProdcutValidationError {
  @ApiPropertyOptional({
    description: 'Validation Errors',
    example: ['name should not be empty'],
  })
  message: string[];
  @ApiPropertyOptional({
    description: 'Ecomm Error Code',
    example: 'ECOMM_ERR_103',
  })
  ecommErrorCode: string;
}
