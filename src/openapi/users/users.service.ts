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
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findById(id: string): Promise<User> {
    return this.userRepository.findOne({
      where: {
        uuid: id,
      },
    });
  }

  async findByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({
      where: {
        email: email,
      },
    });
  }

  async create(userData: CreateUserDto): Promise<any> {
    const data = instanceToPlain(userData);
    const newUsers = this.userRepository.create(data);
    return this.userRepository.save(newUsers);
  }

  async update(userData: UpdateUserDto): Promise<User> {
    const data = instanceToPlain(userData);
    await this.userRepository.update(data.uuid, data);
    return this.findById(`${data.uuid}`);
  }

  async delete(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }
}
