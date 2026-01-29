import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Category, Subcategory } from '../entities';

export interface PaginationResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface CreateCategoryDto {
  name: string;
  slug?: string;
  short_name?: string;
  listing_type?: string;
  icon?: string;
  status?: string;
  priority?: number;
  amenities_required?: string;
}

export interface UpdateCategoryDto extends Partial<CreateCategoryDto> {}

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    @InjectRepository(Subcategory)
    private subcategoryRepository: Repository<Subcategory>,
  ) {}

  async findAll(
    page = 1,
    limit = 10,
    search?: string,
    status?: string,
  ): Promise<PaginationResult<Category>> {
    const skip = (page - 1) * limit;

    const queryBuilder = this.categoryRepository.createQueryBuilder('category');

    queryBuilder.where('category.is_trash = :trash', { trash: '0' });

    if (search) {
      queryBuilder.andWhere('category.name LIKE :search', {
        search: `%${search}%`,
      });
    }

    if (status) {
      queryBuilder.andWhere('category.status = :status', { status });
    }

    queryBuilder
      .orderBy('category.priority', 'ASC')
      .addOrderBy('category.name', 'ASC')
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

  async findOne(id: number): Promise<Category> {
    const category = await this.categoryRepository.findOne({
      where: { id },
    });

    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }

    return category;
  }

  async getSubcategories(categoryId: number): Promise<Subcategory[]> {
    return this.subcategoryRepository.find({
      where: { category_id: categoryId, is_trash: '0' },
      order: { name: 'ASC' },
    });
  }

  async create(createDto: CreateCategoryDto): Promise<Category> {
    const category = this.categoryRepository.create({
      name: createDto.name,
      slug: createDto.slug || this.generateSlug(createDto.name),
      short_name: createDto.short_name,
      listing_type: createDto.listing_type,
      icon: createDto.icon,
      status: createDto.status || 'A',
      priority: createDto.priority || 0,
      amenities_required: createDto.amenities_required || 'N',
      is_trash: '0',
      date_added: new Date(),
    });

    return this.categoryRepository.save(category);
  }

  async update(id: number, updateDto: UpdateCategoryDto): Promise<Category> {
    const category = await this.findOne(id);

    if (updateDto.name && !updateDto.slug) {
      updateDto.slug = this.generateSlug(updateDto.name);
    }

    Object.assign(category, updateDto);
    return this.categoryRepository.save(category);
  }

  async remove(id: number): Promise<void> {
    const category = await this.findOne(id);

    const subcategoriesCount = await this.subcategoryRepository.count({
      where: { category_id: id, is_trash: '0' },
    });

    if (subcategoriesCount > 0) {
      throw new Error(
        `Cannot delete category. It has ${subcategoriesCount} subcategories. Please delete them first.`,
      );
    }

    // Soft delete by setting is_trash
    category.is_trash = '1';
    await this.categoryRepository.save(category);
  }

  async count(): Promise<number> {
    return this.categoryRepository.count({
      where: { is_trash: '0' },
    });
  }

  private generateSlug(name: string): string {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }
}
