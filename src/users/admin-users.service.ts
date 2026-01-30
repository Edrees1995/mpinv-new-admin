import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { User } from '../entities';

@Injectable()
export class AdminUsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find({
      order: { date_added: 'ASC' },
    });
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`Admin user with ID ${id} not found`);
    }
    return user;
  }

  async create(data: Partial<User>): Promise<User> {
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 12);
    }
    const user = this.userRepository.create({
      ...data,
      uid: this.generateUid(),
      status: data.status || 'active',
      removable: 'yes',
      date_added: new Date(),
      last_updated: new Date(),
    });
    return this.userRepository.save(user);
  }

  async update(id: number, data: Partial<User>): Promise<User> {
    const user = await this.findOne(id);

    if (data.password && data.password.trim() !== '') {
      data.password = await bcrypt.hash(data.password, 12);
    } else {
      delete data.password;
    }

    data.last_updated = new Date();
    Object.assign(user, data);
    return this.userRepository.save(user);
  }

  async remove(id: number): Promise<void> {
    const user = await this.findOne(id);
    if (user.removable === 'no') {
      throw new Error('This admin user cannot be deleted');
    }
    await this.userRepository.remove(user);
  }

  private generateUid(): string {
    return Date.now().toString(36) + Math.random().toString(36).substring(2, 5);
  }
}
