import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  HttpCode,
} from '@nestjs/common';
import { OrganizationsService } from './organizations.service';
import { Organization } from '../entities/organization.entity';
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
  CreateOrganizationDuplicateError,
  CreateOrganizationSuccess,
  CreateOrganizationValidationError,
  CreateOrganizationDto,
  GetOrganizationDto,
  UpdateOrganizationDto,
} from '../dto/organization.dto';
import {
  ForbiddenError,
  InternalServerError,
  UnauthorizedError,
} from 'src/core/errors/open-api-error';

@ApiTags(OPEN_API_TAGS.ORGANIZATION)
@ApiSecurity(OPEN_API_TAGS.API_KEY_HEADER)
@Controller(`${OPEN_API_RESOURCES.CONFIG}${OPEN_API_PATHS.ORGANIZATION}`)
export class OrganizationsController {
  constructor(private readonly organizationsService: OrganizationsService) {}
  @ApiOperation({
    description: 'Creates an organization',
    summary: 'Organization - Create',
  })
  @ApiResponse({
    type: CreateOrganizationSuccess,
    status: 200,
  })
  @ApiExtraModels(
    CreateOrganizationDuplicateError,
    CreateOrganizationValidationError,
  )
  @ApiBadRequestResponse({
    schema: {
      anyOf: refs(
        CreateOrganizationDuplicateError,
        CreateOrganizationValidationError,
      ),
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
    @Body() organizationsData: CreateOrganizationDto,
  ): Promise<Organization> {
    return this.organizationsService.create(organizationsData);
  }

  @Get()
  async findAll(): Promise<Organization[]> {
    return this.organizationsService.findAll();
  }

  @Get(':uuid')
  async findById(@Param() params: GetOrganizationDto): Promise<Organization> {
    return this.organizationsService.findById(params.uuid);
  }

  @Put()
  async update(
    @Body() organizationsData: UpdateOrganizationDto,
  ): Promise<Organization> {
    return this.organizationsService.update(organizationsData);
  }

  @Delete(':uuid')
  async delete(@Param('uuid') uuid: string): Promise<void> {
    return this.organizationsService.delete(uuid);
  }
}
