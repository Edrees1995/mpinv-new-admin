import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Community, SubCommunity } from '../entities';

// Base URL for images stored in the old admin panel
const IMAGE_BASE_URL = 'https://admin.mpinv.cloud/uploads/ads/';

export interface PaginationResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface CreateCommunityDto {
  name: string;
  slug?: string;
  meta_title?: string;
  meta_description?: string;
  highend?: string;
  featured?: string;
  priority?: number;
  image?: string;
  image2?: string;
  has_sub_communities?: string;
}

export interface UpdateCommunityDto extends Partial<CreateCommunityDto> {}

@Injectable()
export class CommunitiesService {
  constructor(
    @InjectRepository(Community)
    private communityRepository: Repository<Community>,
    @InjectRepository(SubCommunity)
    private subCommunityRepository: Repository<SubCommunity>,
  ) {}

  // Transform community to include full image URLs
  private transformCommunity(community: Community): Community {
    if (community.image && !community.image.startsWith('http')) {
      community.image = IMAGE_BASE_URL + community.image;
    }
    if (community.image2 && !community.image2.startsWith('http')) {
      community.image2 = IMAGE_BASE_URL + community.image2;
    }
    return community;
  }

  async findAll(
    page = 1,
    limit = 10,
    search?: string,
  ): Promise<PaginationResult<Community>> {
    const skip = (page - 1) * limit;

    const queryBuilder = this.communityRepository.createQueryBuilder('community');

    if (search) {
      queryBuilder.where('community.name LIKE :search', {
        search: `%${search}%`,
      });
    }

    queryBuilder
      .orderBy('community.priority', 'ASC')
      .addOrderBy('community.name', 'ASC')
      .skip(skip)
      .take(limit);

    const [data, total] = await queryBuilder.getManyAndCount();

    return {
      data: data.map((community) => this.transformCommunity(community)),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findOne(id: number): Promise<Community> {
    const community = await this.communityRepository.findOne({
      where: { id },
      relations: ['subCommunities'],
    });

    if (!community) {
      throw new NotFoundException(`Community with ID ${id} not found`);
    }

    return this.transformCommunity(community);
  }

  async create(createDto: CreateCommunityDto): Promise<Community> {
    const community = this.communityRepository.create({
      name: createDto.name,
      slug: createDto.slug || this.generateSlug(createDto.name),
      meta_title: createDto.meta_title,
      meta_description: createDto.meta_description,
      highend: createDto.highend || '0',
      featured: createDto.featured || '0',
      priority: createDto.priority || 0,
      image: createDto.image,
      image2: createDto.image2,
      has_sub_communities: createDto.has_sub_communities || '0',
    });

    return this.communityRepository.save(community);
  }

  async update(id: number, updateDto: UpdateCommunityDto): Promise<Community> {
    const community = await this.findOne(id);

    if (updateDto.name && !updateDto.slug) {
      updateDto.slug = this.generateSlug(updateDto.name);
    }

    Object.assign(community, updateDto);
    return this.communityRepository.save(community);
  }

  async remove(id: number): Promise<void> {
    const community = await this.findOne(id);

    // Check if community has sub-communities
    const subCommunitiesCount = await this.subCommunityRepository.count({
      where: { community_id: id },
    });

    if (subCommunitiesCount > 0) {
      throw new Error(
        `Cannot delete community. It has ${subCommunitiesCount} sub-communities. Please delete them first.`,
      );
    }

    await this.communityRepository.remove(community);
  }

  async getSubCommunities(communityId: number): Promise<SubCommunity[]> {
    return this.subCommunityRepository.find({
      where: { community_id: communityId },
      order: { name: 'ASC' },
    });
  }

  async count(): Promise<number> {
    return this.communityRepository.count();
  }

  private generateSlug(name: string): string {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }
}
