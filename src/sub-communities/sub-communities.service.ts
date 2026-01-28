import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SubCommunity, Community } from '../entities';

export interface PaginationResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface CreateSubCommunityDto {
  name: string;
  slug?: string;
  community_id: number;
  description?: string;
  image?: string;
  latitude?: number;
  longitude?: number;
  status?: number;
  sort_order?: number;
  meta_title?: string;
  meta_description?: string;
}

export interface UpdateSubCommunityDto extends Partial<CreateSubCommunityDto> {}

@Injectable()
export class SubCommunitiesService {
  constructor(
    @InjectRepository(SubCommunity)
    private subCommunityRepository: Repository<SubCommunity>,
    @InjectRepository(Community)
    private communityRepository: Repository<Community>,
  ) {}

  async findAll(
    page = 1,
    limit = 10,
    search?: string,
    communityId?: number,
  ): Promise<PaginationResult<SubCommunity>> {
    const skip = (page - 1) * limit;

    const queryBuilder = this.subCommunityRepository
      .createQueryBuilder('subCommunity')
      .leftJoinAndSelect('subCommunity.community', 'community');

    if (search) {
      queryBuilder.where('subCommunity.name LIKE :search', {
        search: `%${search}%`,
      });
    }

    if (communityId) {
      queryBuilder.andWhere('subCommunity.community_id = :communityId', {
        communityId,
      });
    }

    queryBuilder
      .orderBy('subCommunity.sort_order', 'ASC')
      .addOrderBy('subCommunity.name', 'ASC')
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

  async findOne(id: number): Promise<SubCommunity> {
    const subCommunity = await this.subCommunityRepository.findOne({
      where: { id },
      relations: ['community'],
    });

    if (!subCommunity) {
      throw new NotFoundException(`Sub-Community with ID ${id} not found`);
    }

    return subCommunity;
  }

  async create(createDto: CreateSubCommunityDto): Promise<SubCommunity> {
    // Verify community exists
    const community = await this.communityRepository.findOne({
      where: { id: createDto.community_id },
    });

    if (!community) {
      throw new NotFoundException(
        `Community with ID ${createDto.community_id} not found`,
      );
    }

    const subCommunity = this.subCommunityRepository.create({
      name: createDto.name,
      slug: createDto.slug || this.generateSlug(createDto.name),
      community_id: createDto.community_id,
      description: createDto.description,
      image: createDto.image,
      latitude: createDto.latitude,
      longitude: createDto.longitude,
      status: createDto.status ?? 1,
      sort_order: createDto.sort_order ?? 0,
      meta_title: createDto.meta_title,
      meta_description: createDto.meta_description,
    });

    return this.subCommunityRepository.save(subCommunity);
  }

  async update(
    id: number,
    updateDto: UpdateSubCommunityDto,
  ): Promise<SubCommunity> {
    const subCommunity = await this.findOne(id);

    // Verify community exists if changing it
    if (updateDto.community_id) {
      const community = await this.communityRepository.findOne({
        where: { id: updateDto.community_id },
      });

      if (!community) {
        throw new NotFoundException(
          `Community with ID ${updateDto.community_id} not found`,
        );
      }
    }

    if (updateDto.name && !updateDto.slug) {
      updateDto.slug = this.generateSlug(updateDto.name);
    }

    Object.assign(subCommunity, updateDto);
    return this.subCommunityRepository.save(subCommunity);
  }

  async remove(id: number): Promise<void> {
    const subCommunity = await this.findOne(id);
    await this.subCommunityRepository.remove(subCommunity);
  }

  async getAllCommunities(): Promise<Community[]> {
    return this.communityRepository.find({
      order: { name: 'ASC' },
    });
  }

  async count(): Promise<number> {
    return this.subCommunityRepository.count();
  }

  async countByCommunity(communityId: number): Promise<number> {
    return this.subCommunityRepository.count({
      where: { community_id: communityId },
    });
  }

  private generateSlug(name: string): string {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }
}
