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
import { OrdersService } from './orders.service';
import { Order } from '../entities/order.entity';
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
  CreateOrderDuplicateError,
  CreateOrderSuccess,
  CreateOrderValidationError,
  CreateOrderDto,
  GetOrderDto,
  UpdateOrderDto,
} from '../dto/order.dto';
import {
  ForbiddenError,
  InternalServerError,
  UnauthorizedError,
} from 'src/core/errors/open-api-error';
import { AuthGuard } from 'src/core/guards/auth/auth.guard';

@ApiTags(OPEN_API_TAGS.ORDER)
// @ApiSecurity(OPEN_API_TAGS.API_KEY_HEADER)
@ApiSecurity(OPEN_API_TAGS.API_TOKEN_HEADER)
@UseGuards(AuthGuard)
@Controller(`${OPEN_API_RESOURCES.ECOMM}${OPEN_API_PATHS.ORDER}`)
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}
  @ApiOperation({
    description: 'Creates an order',
    summary: 'Order - Create',
  })
  @ApiResponse({
    type: CreateOrderSuccess,
    status: 200,
  })
  @ApiExtraModels(CreateOrderDuplicateError, CreateOrderValidationError)
  @ApiBadRequestResponse({
    schema: {
      anyOf: refs(CreateOrderDuplicateError, CreateOrderValidationError),
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
    @Body() orderData: CreateOrderDto,
  ): Promise<Order> {
    return this.ordersService.create(req.authDetails, orderData);
  }

  @Get()
  async findAll(@Request() req: any): Promise<Order[]> {
    return this.ordersService.findAll(req.authDetails);
  }

  @Get('/org-orders')
  async findOrgOrders(@Request() req: any): Promise<Order[]> {
    return this.ordersService.findOrgOrders(req.authDetails);
  }

  @Get(':uuid')
  async findById(@Param() params: GetOrderDto): Promise<Order> {
    return this.ordersService.findById(params.uuid);
  }

  @Put()
  async update(@Body() orderData: UpdateOrderDto): Promise<Order> {
    return this.ordersService.update(orderData);
  }

  @Delete(':uuid')
  async delete(@Param('uuid') uuid: string): Promise<void> {
    return this.ordersService.delete(uuid);
  }
}
