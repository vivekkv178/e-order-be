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
} from '@nestjs/common';
import { UsersService } from './users.service';
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
  ForbiddenError,
  InternalServerError,
  UnauthorizedError,
} from 'src/core/errors/open-api-error';
import { User } from '../entities/user.entity';
import {
  CreateUserDto,
  CreateUserDuplicateError,
  CreateUserSuccess,
  CreateUserValidationError,
  GetUserDto,
  UpdateUserDto,
} from '../dto/user.dto';
import { AuthGuard } from 'src/core/guards/auth/auth.guard';

@ApiTags(OPEN_API_TAGS.USER)
// @ApiSecurity(OPEN_API_TAGS.API_KEY_HEADER)
@ApiSecurity(OPEN_API_TAGS.API_TOKEN_HEADER)
@UseGuards(AuthGuard)
@Controller(`${OPEN_API_RESOURCES.CONFIG}${OPEN_API_PATHS.USER}`)
export class UsersController {
  constructor(private readonly organizationsService: UsersService) {}
  @ApiOperation({
    description: 'Creates an user',
    summary: 'Users - Create',
  })
  @ApiResponse({
    type: CreateUserSuccess,
    status: 200,
  })
  @ApiExtraModels(CreateUserDuplicateError, CreateUserValidationError)
  @ApiBadRequestResponse({
    schema: {
      anyOf: refs(CreateUserDuplicateError, CreateUserValidationError),
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
  async create(@Body() organizationsData: CreateUserDto): Promise<User> {
    return this.organizationsService.create(organizationsData);
  }

  @Get()
  async findAll(): Promise<User[]> {
    return this.organizationsService.findAll();
  }

  @Get(':uuid')
  async findById(@Param() params: GetUserDto): Promise<User> {
    return this.organizationsService.findById(params.uuid);
  }

  @Put()
  async update(@Body() organizationsData: UpdateUserDto): Promise<User> {
    return this.organizationsService.update(organizationsData);
  }

  @Delete(':uuid')
  async delete(@Param('uuid') uuid: string): Promise<void> {
    return this.organizationsService.delete(uuid);
  }
}
