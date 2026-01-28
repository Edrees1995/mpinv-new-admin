import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, FindOptionsWhere } from 'typeorm';
import {
  Property,
  PropertyImage,
  PropertyAmenity,
  Category,
  Subcategory,
  Community,
} from '../entities';

export interface PaginationResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface PropertyFilters {
  search?: string;
  category_id?: number;
  subcategory_id?: number;
  community_id?: number;
  purpose?: string;
  status?: string;
  minPrice?: number;
  maxPrice?: number;
}

@Injectable()
export class PropertiesService {
  constructor(
    @InjectRepository(Property)
    private propertyRepository: Repository<Property>,
    @InjectRepository(PropertyImage)
    private propertyImageRepository: Repository<PropertyImage>,
    @InjectRepository(PropertyAmenity)
    private propertyAmenityRepository: Repository<PropertyAmenity>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    @InjectRepository(Subcategory)
    private subcategoryRepository: Repository<Subcategory>,
    @InjectRepository(Community)
    private communityRepository: Repository<Community>,
  ) {}

  async findAll(
    page = 1,
    limit = 20,
    filters: PropertyFilters = {},
  ): Promise<PaginationResult<Property>> {
    try {
      const skip = (page - 1) * limit;
      const where: FindOptionsWhere<Property> = {};

      // Apply filters
      if (filters.search) {
        where.title = Like(`%${filters.search}%`);
      }
      if (filters.category_id) {
        where.category_id = filters.category_id;
      }
      if (filters.subcategory_id) {
        where.subcategory_id = filters.subcategory_id;
      }
      if (filters.community_id) {
        where.city = filters.community_id;
      }
      if (filters.purpose) {
        where.purpose = filters.purpose;
      }
      if (filters.status) {
        where.status = filters.status;
      }

      // Exclude trashed properties
      where.is_trash = '0';

      const [data, total] = await this.propertyRepository.findAndCount({
        where,
        relations: ['category', 'community'],
        order: { priority: 'DESC', created_at: 'DESC' },
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
    } catch (error) {
      console.error('Error fetching properties:', error);
      return {
        data: [],
        total: 0,
        page,
        limit,
        totalPages: 0,
      };
    }
  }

  async findOne(id: number): Promise<Property | null> {
    try {
      return await this.propertyRepository.findOne({
        where: { id },
        relations: ['category', 'community'],
      });
    } catch (error) {
      console.error('Error fetching property:', error);
      return null;
    }
  }

  async getPropertyImages(propertyId: number): Promise<PropertyImage[]> {
    try {
      return await this.propertyImageRepository.find({
        where: { ad_id: propertyId },
        order: { sort_order: 'ASC', is_featured: 'DESC' },
      });
    } catch (error) {
      console.error('Error fetching property images:', error);
      return [];
    }
  }

  async getPropertyAmenities(propertyId: number): Promise<PropertyAmenity[]> {
    try {
      return await this.propertyAmenityRepository.find({
        where: { ad_id: propertyId },
        relations: ['amenity'],
      });
    } catch (error) {
      console.error('Error fetching property amenities:', error);
      return [];
    }
  }

  async getCategories(): Promise<Category[]> {
    try {
      return await this.categoryRepository.find({
        where: { status: 1 },
        order: { sort_order: 'ASC', name: 'ASC' },
      });
    } catch (error) {
      console.error('Error fetching categories:', error);
      return [];
    }
  }

  async getSubcategories(categoryId?: number): Promise<Subcategory[]> {
    try {
      const where: FindOptionsWhere<Subcategory> = { status: 1 };
      if (categoryId) {
        where.category_id = categoryId;
      }
      return await this.subcategoryRepository.find({
        where,
        order: { sort_order: 'ASC', name: 'ASC' },
      });
    } catch (error) {
      console.error('Error fetching subcategories:', error);
      return [];
    }
  }

  async getCommunities(): Promise<Community[]> {
    try {
      return await this.communityRepository.find({
        order: { priority: 'DESC', name: 'ASC' },
      });
    } catch (error) {
      console.error('Error fetching communities:', error);
      return [];
    }
  }

  async count(): Promise<number> {
    try {
      return await this.propertyRepository.count({
        where: { is_trash: '0' },
      });
    } catch (error) {
      console.error('Error counting properties:', error);
      return 0;
    }
  }

  formatPrice(price: number): string {
    if (!price) return 'Price on Request';
    return new Intl.NumberFormat('en-AE', {
      style: 'currency',
      currency: 'AED',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  }

  getPurposeLabel(purpose: string): string {
    switch (purpose) {
      case 'S':
        return 'For Sale';
      case 'R':
        return 'For Rent';
      default:
        return purpose || 'Unknown';
    }
  }

  getStatusLabel(status: string): string {
    switch (status) {
      case 'A':
        return 'Active';
      case 'I':
        return 'Inactive';
      default:
        return status || 'Unknown';
    }
  }
}
