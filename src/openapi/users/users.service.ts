import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DATABASE_OPENAPI } from 'src/core/config/databases';
import { CreateUserDto, UpdateUserDto } from '../dto/user.dto';
import { instanceToPlain } from 'class-transformer';
import { User } from '../entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User, DATABASE_OPENAPI)
    private readonly organizationsRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.organizationsRepository.find();
  }

  async findById(id: string): Promise<User> {
    return this.organizationsRepository.findOne({
      where: {
        uuid: id,
      },
    });
  }

  async create(organizationsData: CreateUserDto): Promise<any> {
    const data = instanceToPlain(organizationsData);
    const newUsers = this.organizationsRepository.create(data);
    return this.organizationsRepository.save(newUsers);
  }

  async update(organizationsData: UpdateUserDto): Promise<User> {
    const data = instanceToPlain(organizationsData);
    await this.organizationsRepository.update(data.uuid, data);
    return this.findById(`${data.uuid}`);
  }

  async delete(id: string): Promise<void> {
    await this.organizationsRepository.delete(id);
  }
}
