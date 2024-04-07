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
  ) {}

  async findAll(): Promise<Organization[]> {
    return this.organizationsRepository.find();
  }

  async findById(id: string): Promise<Organization> {
    return this.organizationsRepository.findOne({
      where: {
        uuid: id,
      },
    });
  }

  async create(organizationsData: CreateOrganizationDto): Promise<any> {
    const data = instanceToPlain(organizationsData);
    const newOrganizations = this.organizationsRepository.create(data);
    return this.organizationsRepository.save(newOrganizations);
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
