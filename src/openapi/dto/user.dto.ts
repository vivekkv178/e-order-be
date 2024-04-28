import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import {
  IsNotEmpty,
  IsString,
  IsEmail,
  IsOptional,
  IsUUID,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: 'The username of the user', example: 'john_doe' })
  @IsNotEmpty()
  @IsString()
  @Expose()
  username: string;

  @ApiProperty({
    description: 'The email address of the user',
    example: 'john@example.com',
  })
  @IsNotEmpty()
  @IsEmail()
  @Expose()
  email: string;

  @ApiPropertyOptional({
    description: 'The full name of the user',
    example: 'John Doe',
  })
  @IsOptional()
  @IsString()
  @Expose()
  full_name?: string;

  @ApiPropertyOptional({
    description: 'The role of the user',
    example: 'ADMIN',
  })
  @IsOptional()
  @IsString()
  @Expose()
  role?: string;

  @ApiPropertyOptional({
    description: 'Whether the user is active',
    example: true,
  })
  @IsOptional()
  @Expose()
  is_active?: boolean;

  @ApiPropertyOptional({
    description: 'Whether the user is active',
    example: true,
  })
  @IsOptional()
  @Expose()
  is_org_user?: boolean;

  @ApiPropertyOptional({
    description: 'Whether the user is active',
    example: true,
  })
  @IsOptional()
  @Expose()
  is_org_admin?: boolean;

  @ApiPropertyOptional({
    description: 'Whether the user is active',
    example: true,
  })
  @IsOptional()
  @Expose()
  is_customer?: boolean;

  @ApiPropertyOptional({
    description: 'Whether the user is active',
    example: true,
  })
  @IsOptional()
  @Expose()
  @IsUUID()
  org_uuid?: string;
}

export class UpdateUserDto {
  @ApiProperty({
    description: 'The UUID of the user',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsNotEmpty()
  @IsUUID()
  @Expose()
  uuid: string;

  @ApiPropertyOptional({
    description: 'The updated username of the user',
    example: 'john_doe',
  })
  @IsOptional()
  @IsString()
  @Expose()
  username?: string;

  @ApiPropertyOptional({
    description: 'The updated email address of the user',
    example: 'john@example.com',
  })
  @IsOptional()
  @IsEmail()
  @Expose()
  email?: string;

  @ApiPropertyOptional({
    description: 'The updated full name of the user',
    example: 'John Doe',
  })
  @IsOptional()
  @IsString()
  @Expose()
  full_name?: string;

  @ApiPropertyOptional({
    description: 'The updated role of the user',
    example: 'ADMIN',
  })
  @IsOptional()
  @IsString()
  @Expose()
  role?: string;

  @ApiPropertyOptional({
    description: 'Whether the user is active or not',
    example: true,
  })
  @IsOptional()
  @Expose()
  is_active?: boolean;
}

export class GetUserDto {
  @ApiProperty({
    description: 'The UUID of the user',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsNotEmpty()
  @IsUUID()
  @Expose()
  uuid: string;
}

export class DeleteUserDto {
  @ApiProperty({
    description: 'The UUID of the user to delete',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsNotEmpty()
  @IsUUID()
  @Expose()
  uuid: string;
}

export class CreateUserSuccess {
  @ApiPropertyOptional({
    description: 'Success Message',
    example: 'User Added Successfully.',
  })
  message: string;
}

export class CreateUserDuplicateError {
  @ApiPropertyOptional({
    description: 'Error Message',
    example: 'User Name already exists.',
  })
  message: string;
  @ApiPropertyOptional({
    description: 'Ecomm Error Code',
    example: 'ECOMM_ERR_ORG_100',
  })
  ecommErrorCode: string;
}

export class CreateUserValidationError {
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
