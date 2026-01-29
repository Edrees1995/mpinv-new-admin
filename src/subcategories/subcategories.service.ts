import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subcategory, Category } from '../entities';

export interface PaginationResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface CreateSubcategoryDto {
  name: string;
  slug?: string;
  category_id?: number;
  priority?: number;
  status?: string;
}

export interface UpdateSubcategoryDto extends Partial<CreateSubcategoryDto> {}

@Injectable()
export class SubcategoriesService {
  constructor(
    @InjectRepository(Subcategory)
    private subcategoryRepository: Repository<Subcategory>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async findAll(
    page = 1,
    limit = 10,
    search?: string,
    categoryId?: number,
  ): Promise<PaginationResult<Subcategory>> {
    const skip = (page - 1) * limit;

    const queryBuilder = this.subcategoryRepository
      .createQueryBuilder('subcategory')
      .leftJoinAndSelect('subcategory.category', 'category');

    queryBuilder.where('subcategory.is_trash = :trash', { trash: '0' });

    if (search) {
      queryBuilder.andWhere('subcategory.name LIKE :search', {
        search: `%${search}%`,
      });
    }

    if (categoryId) {
      queryBuilder.andWhere('subcategory.category_id = :categoryId', { categoryId });
    }

    queryBuilder
      .orderBy('subcategory.priority', 'ASC')
      .addOrderBy('subcategory.name', 'ASC')
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

  async findOne(id: number): Promise<Subcategory> {
    const subcategory = await this.subcategoryRepository.findOne({
      where: { id },
      relations: ['category'],
    });

    if (!subcategory) {
      throw new NotFoundException(`Subcategory with ID ${id} not found`);
    }

    return subcategory;
  }

  async getAllCategories(): Promise<Category[]> {
    return this.categoryRepository.find({
      where: { is_trash: '0' },
      order: { name: 'ASC' },
    });
  }

  async create(createDto: CreateSubcategoryDto): Promise<Subcategory> {
    const subcategory = this.subcategoryRepository.create({
      name: createDto.name,
      slug: createDto.slug || this.generateSlug(createDto.name),
      category_id: createDto.category_id,
      priority: createDto.priority || 0,
      status: createDto.status || 'A',
      is_trash: '0',
      date_added: new Date(),
    });

    return this.subcategoryRepository.save(subcategory);
  }

  async update(id: number, updateDto: UpdateSubcategoryDto): Promise<Subcategory> {
    const subcategory = await this.findOne(id);

    if (updateDto.name && !updateDto.slug) {
      updateDto.slug = this.generateSlug(updateDto.name);
    }

    Object.assign(subcategory, updateDto);
    return this.subcategoryRepository.save(subcategory);
  }

  async remove(id: number): Promise<void> {
    const subcategory = await this.findOne(id);
    subcategory.is_trash = '1';
    await this.subcategoryRepository.save(subcategory);
  }

  private generateSlug(name: string): string {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }
}
