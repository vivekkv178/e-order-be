import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateOrganizationDto {
  @ApiProperty({
    example: 'Acme Corporation',
    description: 'The name of the organization',
  })
  @IsNotEmpty()
  @IsString()
  @Expose()
  name: string;

  @ApiProperty({
    example: 'info@acme.com',
    description: 'The email address of the organization',
  })
  @IsNotEmpty()
  @IsString()
  @Expose()
  email?: string;

  @ApiPropertyOptional({
    example: '123 Main Street',
    description: 'The address of the organization',
  })
  @IsOptional()
  @IsString()
  @Expose()
  address?: string;

  @ApiPropertyOptional({
    example: 'New York',
    description: 'The city where the organization is located',
  })
  @IsOptional()
  @IsString()
  @Expose()
  city?: string;

  @ApiPropertyOptional({
    example: 'NY',
    description: 'The state where the organization is located',
  })
  @IsOptional()
  @IsString()
  @Expose()
  state?: string;

  @ApiPropertyOptional({
    example: 'US',
    description: 'The country where the organization is located',
  })
  @IsOptional()
  @IsString()
  @Expose()
  country?: string;

  @ApiPropertyOptional({
    example: '12345',
    description: 'The postal code of the organization',
  })
  @IsOptional()
  @IsString()
  @Expose()
  postal_code?: string;

  @ApiPropertyOptional({
    example: '+1-234-567-8901',
    description: 'The phone number of the organization',
  })
  @IsOptional()
  @IsString()
  @Expose()
  phone_number?: string;

  @ApiPropertyOptional({
    example: 'https://www.acme.com',
    description: 'The website URL of the organization',
  })
  @IsOptional()
  @IsString()
  @Expose()
  website?: string;

  @ApiPropertyOptional({
    example: 'https://www.acme.com',
    description: 'The logo URL of the organization',
  })
  @IsOptional()
  @IsString()
  @Expose()
  logo?: string;
}

export class UpdateOrganizationDto {
  @ApiProperty({
    example: 'c7b5a694-d5ff-4d0c-bcd0-8e0af25f1bfc',
    description: 'The UUID of the organization',
  })
  @IsOptional()
  @IsUUID()
  @Expose()
  uuid?: string;

  @ApiProperty({
    example: 'Acme Corporation',
    description: 'The updated name of the organization',
  })
  @IsOptional()
  @IsString()
  @Expose()
  name?: string;

  @ApiProperty({
    example: '123 Main Street',
    description: 'The updated address of the organization',
  })
  @IsOptional()
  @IsString()
  @Expose()
  address?: string;

  @ApiProperty({
    example: 'New York',
    description: 'The updated city where the organization is located',
  })
  @IsOptional()
  @IsString()
  @Expose()
  city?: string;

  @ApiProperty({
    example: 'NY',
    description: 'The updated state where the organization is located',
  })
  @IsOptional()
  @IsString()
  @Expose()
  state?: string;

  @ApiProperty({
    example: 'US',
    description: 'The updated country where the organization is located',
  })
  @IsOptional()
  @IsString()
  @Expose()
  country?: string;

  @ApiProperty({
    example: '12345',
    description: 'The updated postal code of the organization',
  })
  @IsOptional()
  @IsString()
  @Expose()
  postal_code?: string;

  @ApiProperty({
    example: '+1-234-567-8901',
    description: 'The updated phone number of the organization',
  })
  @IsOptional()
  @IsString()
  @Expose()
  phone_number?: string;

  @ApiProperty({
    example: 'info@acme.com',
    description: 'The updated email address of the organization',
  })
  @IsOptional()
  @IsString()
  @Expose()
  email?: string;

  @ApiProperty({
    example: 'https://www.acme.com',
    description: 'The updated website URL of the organization',
  })
  @IsOptional()
  @IsString()
  @Expose()
  website?: string;
}

export class GetOrganizationDto {
  @ApiProperty({
    example: 'c7b5a694-d5ff-4d0c-bcd0-8e0af25f1bfc',
    description: 'The ID of the organization',
  })
  @IsUUID()
  @Expose()
  uuid: string;
}

export class DeleteOrganizationDto {
  @ApiProperty({
    example: 'c7b5a694-d5ff-4d0c-bcd0-8e0af25f1bfc',
    description: 'The ID of the organization to delete',
  })
  @IsUUID()
  @Expose()
  uuid: string;
}

export class CreateOrganizationSuccess {
  @ApiPropertyOptional({
    description: 'Success Message',
    example: 'Organization Added Successfully.',
  })
  message: string;
}

export class CreateOrganizationDuplicateError {
  @ApiPropertyOptional({
    description: 'Error Message',
    example: 'Organization Name already exists.',
  })
  message: string;
  @ApiPropertyOptional({
    description: 'Ecomm Error Code',
    example: 'ECOMM_ERR_ORG_100',
  })
  ecommErrorCode: string;
}

export class CreateOrganizationValidationError {
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
