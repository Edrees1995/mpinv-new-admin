import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Article } from '../entities';

const IMAGE_BASE_URL =
  (process.env.IMAGE_BASE_URL || '') + '/uploads/files/';

export interface PaginationResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

@Injectable()
export class TeamsService {
  constructor(
    @InjectRepository(Article)
    private articleRepository: Repository<Article>,
  ) {}

  private transformMember(member: Article): Article {
    if (member.banner && !member.banner.startsWith('http')) {
      member.banner = IMAGE_BASE_URL + member.banner;
    }
    return member;
  }

  async findAll(
    page = 1,
    limit = 20,
    search?: string,
    status?: string,
    teamType?: string,
  ): Promise<PaginationResult<Article>> {
    const skip = (page - 1) * limit;

    const qb = this.articleRepository.createQueryBuilder('article');
    qb.where('article.type = :type', { type: 'Te' });

    if (search) {
      qb.andWhere(
        '(article.title LIKE :search OR article.subtitle LIKE :search)',
        { search: `%${search}%` },
      );
    }

    if (status) {
      qb.andWhere('article.status = :status', { status });
    }

    if (teamType) {
      qb.andWhere('article.team_type = :teamType', { teamType });
    }

    qb.orderBy('article.priority', 'ASC')
      .addOrderBy('article.title', 'ASC')
      .skip(skip)
      .take(limit);

    const [data, total] = await qb.getManyAndCount();

    return {
      data: data.map((m) => this.transformMember(m)),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findOne(id: number): Promise<Article> {
    const member = await this.articleRepository.findOne({
      where: { id, type: 'Te' },
    });

    if (!member) {
      throw new NotFoundException(`Team member with ID ${id} not found`);
    }

    return this.transformMember(member);
  }

  async create(data: Partial<Article>): Promise<Article> {
    const member = this.articleRepository.create({
      ...data,
      type: 'Te',
      slug: data.slug || this.generateSlug(data.title || ''),
      status: data.status || 'published',
      date_added: new Date(),
      last_updated: new Date(),
    });

    return this.articleRepository.save(member);
  }

  async update(id: number, data: Partial<Article>): Promise<Article> {
    const member = await this.findOne(id);

    // Strip image base URL before saving
    if (data.banner && data.banner.startsWith(IMAGE_BASE_URL)) {
      data.banner = data.banner.replace(IMAGE_BASE_URL, '');
    }

    data.last_updated = new Date();
    Object.assign(member, data);
    return this.articleRepository.save(member);
  }

  async remove(id: number): Promise<void> {
    const member = await this.findOne(id);
    await this.articleRepository.remove(member);
  }

  async getTeamTypes(): Promise<string[]> {
    const result = await this.articleRepository
      .createQueryBuilder('article')
      .select('DISTINCT article.team_type', 'team_type')
      .where('article.type = :type', { type: 'Te' })
      .andWhere('article.team_type IS NOT NULL')
      .andWhere('article.team_type != :empty', { empty: '' })
      .getRawMany();

    return result.map((r) => r.team_type);
  }

  private generateSlug(name: string): string {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }
}
