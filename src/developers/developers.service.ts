import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, FindOptionsWhere } from 'typeorm';
import { Developer } from '../entities';

export interface PaginationResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface DeveloperFilters {
  search?: string;
  status?: string;
  featured?: string;
  page?: number;
  limit?: number;
}

@Injectable()
export class DevelopersService {
  constructor(
    @InjectRepository(Developer)
    private developerRepository: Repository<Developer>,
  ) {}

  async findAll(filters: DeveloperFilters): Promise<PaginationResult<Developer>> {
    const page = filters.page || 1;
    const limit = filters.limit || 20;
    const skip = (page - 1) * limit;

    const where: FindOptionsWhere<Developer> = {
      is_trash: '0',
    };

    if (filters.search) {
      where.name = Like(`%${filters.search}%`);
    }

    if (filters.status) {
      where.status = filters.status;
    }

    if (filters.featured) {
      where.featured = filters.featured;
    }

    const [data, total] = await this.developerRepository.findAndCount({
      where,
      order: { created_at: 'DESC' },
      skip,
      take: limit,
    });

    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findOne(id: number): Promise<Developer> {
    const developer = await this.developerRepository.findOne({
      where: { id, is_trash: '0' },
      relations: ['projects'],
    });

    if (!developer) {
      throw new NotFoundException(`Developer with ID ${id} not found`);
    }

    return developer;
  }

  async create(data: Partial<Developer>): Promise<Developer> {
    const developer = this.developerRepository.create({
      ...data,
      created_at: new Date(),
      status: data.status || 'A',
      is_trash: '0',
    });

    return this.developerRepository.save(developer);
  }

  async update(id: number, data: Partial<Developer>): Promise<Developer> {
    const developer = await this.findOne(id);

    Object.assign(developer, data);

    return this.developerRepository.save(developer);
  }

  async delete(id: number): Promise<void> {
    const developer = await this.findOne(id);

    // Soft delete by setting is_trash to '1'
    developer.is_trash = '1';
    await this.developerRepository.save(developer);
  }

  async hardDelete(id: number): Promise<void> {
    const developer = await this.findOne(id);
    await this.developerRepository.remove(developer);
  }

  generateSlug(name: string): string {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  }
}
