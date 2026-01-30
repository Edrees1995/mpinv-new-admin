import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Banner } from '../entities';

const IMAGE_BASE_URL = (process.env.IMAGE_BASE_URL || '') + '/uploads/ads/';

export interface PaginationResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface CreateBannerDto {
  position_id?: number;
  image?: string;
  status?: string;
  is_trash?: string;
  priority?: number;
  link?: string;
  ad_type?: string;
  script?: string;
}

export interface UpdateBannerDto extends Partial<CreateBannerDto> {}

@Injectable()
export class BannersService {
  constructor(
    @InjectRepository(Banner)
    private bannerRepository: Repository<Banner>,
  ) {}

  private transformBanner(banner: Banner): Banner {
    if (banner.image && !banner.image.startsWith('http')) {
      banner.image = IMAGE_BASE_URL + banner.image;
    }
    return banner;
  }

  async findAll(
    page = 1,
    limit = 10,
    search?: string,
    status?: string,
    adType?: string,
  ): Promise<PaginationResult<Banner>> {
    const skip = (page - 1) * limit;

    const queryBuilder = this.bannerRepository.createQueryBuilder('banner');

    // Exclude trashed by default
    queryBuilder.where('banner.isTrash = :trash', { trash: '0' });

    if (search) {
      queryBuilder.andWhere(
        '(banner.link_url LIKE :search OR banner.image LIKE :search)',
        { search: `%${search}%` },
      );
    }

    if (status) {
      queryBuilder.andWhere('banner.status = :status', { status });
    }

    if (adType) {
      queryBuilder.andWhere('banner.ad_type = :adType', { adType });
    }

    queryBuilder
      .orderBy('banner.priority', 'ASC')
      .addOrderBy('banner.banner_id', 'DESC')
      .skip(skip)
      .take(limit);

    const [data, total] = await queryBuilder.getManyAndCount();

    return {
      data: data.map((b) => this.transformBanner(b)),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findOne(id: number): Promise<Banner> {
    const banner = await this.bannerRepository.findOne({
      where: { id },
    });

    if (!banner) {
      throw new NotFoundException(`Banner with ID ${id} not found`);
    }

    return this.transformBanner(banner);
  }

  async create(dto: CreateBannerDto): Promise<Banner> {
    const banner = this.bannerRepository.create({
      position_id: dto.position_id || 0,
      image: dto.image || '',
      status: dto.status || 'A',
      is_trash: '0',
      priority: dto.priority || 0,
      link: dto.link || '',
      ad_type: dto.ad_type || 'adImage',
      script: dto.script || '',
    });

    return this.bannerRepository.save(banner);
  }

  async update(id: number, dto: UpdateBannerDto): Promise<Banner> {
    const banner = await this.bannerRepository.findOne({ where: { id } });

    if (!banner) {
      throw new NotFoundException(`Banner with ID ${id} not found`);
    }

    // Strip image base URL before saving
    if (dto.image && dto.image.startsWith(IMAGE_BASE_URL)) {
      dto.image = dto.image.replace(IMAGE_BASE_URL, '');
    }

    if (dto.position_id !== undefined) banner.position_id = dto.position_id;
    if (dto.image !== undefined) banner.image = dto.image;
    if (dto.status !== undefined) banner.status = dto.status;
    if (dto.is_trash !== undefined) banner.is_trash = dto.is_trash;
    if (dto.priority !== undefined) banner.priority = dto.priority;
    if (dto.link !== undefined) banner.link = dto.link;
    if (dto.ad_type !== undefined) banner.ad_type = dto.ad_type;
    if (dto.script !== undefined) banner.script = dto.script;

    return this.bannerRepository.save(banner);
  }

  async remove(id: number): Promise<void> {
    const banner = await this.bannerRepository.findOne({ where: { id } });

    if (!banner) {
      throw new NotFoundException(`Banner with ID ${id} not found`);
    }

    await this.bannerRepository.remove(banner);
  }

  async count(): Promise<number> {
    return this.bannerRepository.count({
      where: { is_trash: '0' },
    });
  }
}
