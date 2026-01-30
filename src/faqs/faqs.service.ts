import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Article } from '../entities';

export interface PaginationResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

@Injectable()
export class FaqsService {
  constructor(
    @InjectRepository(Article)
    private articleRepository: Repository<Article>,
  ) {}

  async findAll(
    page = 1,
    limit = 20,
    search?: string,
    status?: string,
  ): Promise<PaginationResult<Article>> {
    const skip = (page - 1) * limit;

    const queryBuilder = this.articleRepository.createQueryBuilder('article');
    queryBuilder.where('article.type = :type', { type: 'Fq' });

    if (search) {
      queryBuilder.andWhere(
        '(article.title LIKE :search OR article.content LIKE :search)',
        { search: `%${search}%` },
      );
    }

    if (status) {
      queryBuilder.andWhere('article.status = :status', { status });
    }

    queryBuilder
      .orderBy('article.priority', 'ASC')
      .addOrderBy('article.date_added', 'DESC')
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

  async findOne(id: number): Promise<Article> {
    const article = await this.articleRepository.findOne({
      where: { id, type: 'Fq' },
    });

    if (!article) {
      throw new NotFoundException(`FAQ with ID ${id} not found`);
    }

    return article;
  }

  async create(data: Partial<Article>): Promise<Article> {
    const faq = this.articleRepository.create({
      ...data,
      type: 'Fq',
      slug: data.slug || this.generateSlug(data.title || ''),
      status: data.status || 'published',
      date_added: new Date(),
      last_updated: new Date(),
    });

    return this.articleRepository.save(faq);
  }

  async update(id: number, data: Partial<Article>): Promise<Article> {
    const faq = await this.findOne(id);
    data.last_updated = new Date();
    Object.assign(faq, data);
    return this.articleRepository.save(faq);
  }

  async remove(id: number): Promise<void> {
    const faq = await this.findOne(id);
    await this.articleRepository.remove(faq);
  }

  async count(): Promise<number> {
    return this.articleRepository.count({
      where: { type: 'Fq' },
    });
  }

  private generateSlug(name: string): string {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }
}
