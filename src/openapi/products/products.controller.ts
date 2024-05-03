import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  HttpCode,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from '../entities/product.entity';
import {
  ApiBadRequestResponse,
  ApiExtraModels,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiResponse,
  ApiSecurity,
  ApiTags,
  ApiUnauthorizedResponse,
  refs,
} from '@nestjs/swagger';
import {
  OPEN_API_PATHS,
  OPEN_API_RESOURCES,
  OPEN_API_TAGS,
} from 'src/core/constants/constants';
import {
  CreateProductDuplicateError,
  CreateProductSuccess,
  CreateProductValidationError,
  CreateProductDto,
  GetProductDto,
  UpdateProductDto,
} from '../dto/product.dto';
import {
  ForbiddenError,
  InternalServerError,
  UnauthorizedError,
} from 'src/core/errors/open-api-error';
import { AuthGuard } from 'src/core/guards/auth/auth.guard';

@ApiTags(OPEN_API_TAGS.PRODUCT)
// @ApiSecurity(OPEN_API_TAGS.API_KEY_HEADER)
@ApiSecurity(OPEN_API_TAGS.API_TOKEN_HEADER)
@UseGuards(AuthGuard)
@Controller(`${OPEN_API_RESOURCES.ECOMM}${OPEN_API_PATHS.PRODUCT}`)
export class ProductsController {
  constructor(private readonly organizationsService: ProductsService) {}
  @ApiOperation({
    description: 'Creates an organization',
    summary: 'Product - Create',
  })
  @ApiResponse({
    type: CreateProductSuccess,
    status: 200,
  })
  @ApiExtraModels(CreateProductDuplicateError, CreateProductValidationError)
  @ApiBadRequestResponse({
    schema: {
      anyOf: refs(CreateProductDuplicateError, CreateProductValidationError),
    },
  })
  @ApiInternalServerErrorResponse({
    type: InternalServerError,
  })
  @ApiForbiddenResponse({
    type: ForbiddenError,
  })
  @ApiUnauthorizedResponse({
    type: UnauthorizedError,
  })
  @HttpCode(200)
  @Post()
  async create(
    @Request() req: any,
    @Body() productData: CreateProductDto,
  ): Promise<Partial<Product>> {
    return this.organizationsService.create(req.authDetails, productData);
  }

  @Get()
  async findAll(): Promise<Product[]> {
    return this.organizationsService.findAll();
  }

  @Get('/org')
  async findAllByOrgId(@Request() req: any): Promise<Product[]> {
    return this.organizationsService.findAllByOrgId(req.authDetails);
  }

  @Get(':uuid')
  async findById(@Param() params: GetProductDto): Promise<Product> {
    return this.organizationsService.findById(params.uuid);
  }

  @Put()
  async update(@Body() productData: UpdateProductDto): Promise<Product> {
    return this.organizationsService.update(productData);
  }

  @Delete(':uuid')
  async delete(@Param('uuid') uuid: string): Promise<void> {
    return this.organizationsService.delete(uuid);
  }
}
