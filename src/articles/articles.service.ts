import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Article } from '../entities';

const IMAGE_BASE_URL = (process.env.IMAGE_BASE_URL || '') + '/uploads/files/';

export interface PaginationResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(Article)
    private articleRepository: Repository<Article>,
  ) {}

  async findAll(
    page = 1,
    limit = 20,
    search?: string,
    status?: string,
    type?: string,
  ): Promise<PaginationResult<Article>> {
    const skip = (page - 1) * limit;

    const queryBuilder = this.articleRepository.createQueryBuilder('article');

    // Default: show only blogs (f_type IS NULL) unless a specific type is requested
    if (type === 'all') {
      // show everything
    } else if (type) {
      queryBuilder.where('article.f_type = :type', { type });
    } else {
      queryBuilder.where('article.f_type IS NULL');
    }

    if (search) {
      queryBuilder.andWhere('article.title LIKE :search', {
        search: `%${search}%`,
      });
    }

    if (status) {
      queryBuilder.andWhere('article.status = :status', { status });
    }

    queryBuilder
      .orderBy('article.date_added', 'DESC')
      .skip(skip)
      .take(limit);

    const [data, total] = await queryBuilder.getManyAndCount();

    // Prefix banner URLs
    for (const article of data) {
      if (article.banner && !article.banner.startsWith('http')) {
        article.banner = IMAGE_BASE_URL + article.banner;
      }
    }

    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findOne(id: number): Promise<Article> {
    const article = await this.articleRepository.findOne({
      where: { id },
    });

    if (!article) {
      throw new NotFoundException(`Article with ID ${id} not found`);
    }

    if (article.banner && !article.banner.startsWith('http')) {
      article.banner = IMAGE_BASE_URL + article.banner;
    }

    return article;
  }

  async create(data: Partial<Article>): Promise<Article> {
    const article = this.articleRepository.create({
      ...data,
      slug: data.slug || this.generateSlug(data.title || ''),
      status: data.status || 'published',
      date_added: new Date(),
      last_updated: new Date(),
    });

    return this.articleRepository.save(article);
  }

  async update(id: number, data: Partial<Article>): Promise<Article> {
    const article = await this.findOne(id);

    // Strip image base URL before saving
    if (data.banner && data.banner.startsWith(IMAGE_BASE_URL)) {
      data.banner = data.banner.replace(IMAGE_BASE_URL, '');
    }

    data.last_updated = new Date();
    Object.assign(article, data);
    return this.articleRepository.save(article);
  }

  async remove(id: number): Promise<void> {
    const article = await this.findOne(id);
    await this.articleRepository.remove(article);
  }

  async count(): Promise<number> {
    return this.articleRepository.count();
  }

  private generateSlug(name: string): string {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }
}
