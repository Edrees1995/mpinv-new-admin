import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Amenity } from '../entities';

export interface PaginationResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface CreateAmenityDto {
  name: string;
  icon_list?: string;
  priority?: number;
  status?: string;
}

export interface UpdateAmenityDto extends Partial<CreateAmenityDto> {}

@Injectable()
export class AmenitiesService {
  constructor(
    @InjectRepository(Amenity)
    private amenityRepository: Repository<Amenity>,
  ) {}

  async findAll(
    page = 1,
    limit = 10,
    search?: string,
  ): Promise<PaginationResult<Amenity>> {
    const skip = (page - 1) * limit;

    const queryBuilder = this.amenityRepository.createQueryBuilder('amenity');

    queryBuilder.where('amenity.is_trash = :trash', { trash: '0' });

    if (search) {
      queryBuilder.andWhere('amenity.name LIKE :search', {
        search: `%${search}%`,
      });
    }

    queryBuilder
      .orderBy('amenity.priority', 'ASC')
      .addOrderBy('amenity.name', 'ASC')
      .skip(skip)
      .take(limit);

    const [data, total] = await queryBuilder.getManyAndCount();

    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findOne(id: number): Promise<Amenity> {
    const amenity = await this.amenityRepository.findOne({
      where: { id },
    });

    if (!amenity) {
      throw new NotFoundException(`Amenity with ID ${id} not found`);
    }

    return amenity;
  }

  async create(createDto: CreateAmenityDto): Promise<Amenity> {
    const amenity = this.amenityRepository.create({
      name: createDto.name,
      icon_list: createDto.icon_list,
      priority: createDto.priority || 0,
      status: createDto.status || 'A',
      is_trash: '0',
      f_type: 1,
    });

    return this.amenityRepository.save(amenity);
  }

  async update(id: number, updateDto: UpdateAmenityDto): Promise<Amenity> {
    const amenity = await this.findOne(id);
    Object.assign(amenity, updateDto);
    return this.amenityRepository.save(amenity);
  }

  async remove(id: number): Promise<void> {
    const amenity = await this.findOne(id);
    amenity.is_trash = '1';
    await this.amenityRepository.save(amenity);
  }
}
