import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsNumber,
  IsBoolean,
  IsUUID,
  IsArray,
} from 'class-validator';

export class OrderItem {
  @ApiProperty({
    example: 'c7b5a694-d5ff-4d0c-bcd0-8e0af25f1bfc',
    description: 'The UUID of the product',
  })
  @IsUUID()
  @Expose()
  @IsNotEmpty()
  uuid?: string;

  @ApiPropertyOptional({
    description: 'Quantity of the product',
    example: 2,
  })
  @IsNotEmpty()
  @IsNumber()
  @Expose()
  quantity?: number;
}

export class CreateOrderDto {
  @ApiProperty({
    type: OrderItem,
    isArray: true,
    description: 'Order Items',
  })
  @Expose()
  @IsNotEmpty()
  @IsArray()
  order_items?: OrderItem[];
}

export class UpdateOrderDto {
  @ApiProperty({
    example: 'c7b5a694-d5ff-4d0c-bcd0-8e0af25f1bfc',
    description: 'The UUID of the organization',
  })
  @IsUUID()
  @Expose()
  product_uuid?: string;

  @ApiPropertyOptional({
    description: 'Updated name of the product',
    example: 'Updated Order',
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

export class GetOrderDto {
  @ApiProperty({ description: 'UUID of the product to retrieve', example: 1 })
  @IsNotEmpty()
  @IsUUID()
  @Expose()
  uuid: string;
}

export class DeleteOrderDto {
  @ApiProperty({ description: 'UUID of the product to delete', example: 1 })
  @IsNotEmpty()
  @IsNumber()
  @Expose()
  uuid: string;
}

export class CreateOrderSuccess {
  @ApiPropertyOptional({
    description: 'Success Message',
    example: 'Order Added Successfully.',
  })
  message: string;
}

export class CreateOrderDuplicateError {
  @ApiPropertyOptional({
    description: 'Error Message',
    example: 'Order Name already exists.',
  })
  message: string;
  @ApiPropertyOptional({
    description: 'Ecomm Error Code',
    example: 'ECOMM_ERR_ORG_100',
  })
  ecommErrorCode: string;
}

export class CreateOrderValidationError {
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
