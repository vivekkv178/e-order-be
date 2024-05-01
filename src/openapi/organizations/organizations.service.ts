import { UsersService } from './../users/users.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Organization } from '../entities/organization.entity';
import { DATABASE_OPENAPI } from 'src/core/config/databases';
import {
  CreateOrganizationDto,
  UpdateOrganizationDto,
} from '../dto/organization.dto';
import { instanceToPlain } from 'class-transformer';

@Injectable()
export class OrganizationsService {
  constructor(
    @InjectRepository(Organization, DATABASE_OPENAPI)
    private readonly organizationsRepository: Repository<Organization>,
    private readonly usersService: UsersService,
  ) {}

  async findAll(): Promise<Organization[]> {
    return this.organizationsRepository.find({
      order: {
        id: 'ASC',
      },
    });
  }

  async findById(id: string): Promise<Organization> {
    return this.organizationsRepository.findOne({
      where: {
        uuid: id,
      },
      relations: ['user'],
    });
  }

  async create(organizationsData: CreateOrganizationDto): Promise<any> {
    const data = instanceToPlain(organizationsData);
    const newOrganizations = this.organizationsRepository.create(data);
    const orgData = await this.organizationsRepository.save(newOrganizations);
    const userName = organizationsData.email?.split('@')[0];
    const userData = await this.usersService.create({
      username: userName,
      email: organizationsData.email,
      full_name: userName,
      role: 'ORG_ADMIN',
      is_active: true,
      is_org_admin: true,
      is_org_user: true,
      org_uuid: orgData?.uuid,
    });

    console.log(userData, orgData);

    return { ...orgData, ...userData };
  }

  async update(
    organizationsData: UpdateOrganizationDto,
  ): Promise<Organization> {
    const data = instanceToPlain(organizationsData);
    await this.organizationsRepository.update(data.uuid, data);
    return this.findById(`${data.uuid}`);
  }

  async delete(id: string): Promise<void> {
    await this.organizationsRepository.delete(id);
  }
}
