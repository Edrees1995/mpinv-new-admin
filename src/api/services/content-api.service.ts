import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  Article,
  Faq,
  Team,
  Banner,
  Setting,
} from '../../entities';

const IMAGE_BASE = (process.env.IMAGE_BASE_URL || '') + '/uploads/ads/';

function imgUrl(url: string | null | undefined): string {
  if (!url) return '';
  if (url.startsWith('http')) return url;
  return IMAGE_BASE + url;
}

@Injectable()
export class ContentApiService {
  constructor(
    @InjectRepository(Article)
    private articleRepo: Repository<Article>,
    @InjectRepository(Faq)
    private faqRepo: Repository<Faq>,
    @InjectRepository(Team)
    private teamRepo: Repository<Team>,
    @InjectRepository(Banner)
    private bannerRepo: Repository<Banner>,
    @InjectRepository(Setting)
    private settingRepo: Repository<Setting>,
  ) {}

  // ──── Blogs ────

  async blogsList(page = 1, limit = 10, type?: string) {
    const qb = this.articleRepo.createQueryBuilder('a')
      .where('a.status = :status', { status: 'published' })
      .orderBy('a.date_added', 'DESC')
      .skip((page - 1) * limit)
      .take(limit);

    if (type) {
      qb.andWhere('a.page_title = :type', { type });
    }

    const [articles, total] = await qb.getManyAndCount();

    return {
      status: 'success',
      data: articles.map((a) => ({
        article_id: a.id,
        title: a.title,
        subtitle: a.subtitle,
        slug: a.slug,
        content: a.content,
        banner: imgUrl(a.banner),
        image2: imgUrl(a.image2),
        image3: imgUrl(a.image3),
        image4: imgUrl(a.image4),
        date_added: a.date_added,
        reading_time: a.reading_time,
        meta_title: a.meta_title,
        meta_description: a.meta_description,
        meta_keywords: a.meta_keywords,
        youtube_url: a.youtube_url,
      })),
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async blogs(page = 1, limit = 10) {
    return this.blogsList(page, limit, 'blog');
  }

  // ──── Article Detail ────

  async articleDetail(slug: string) {
    const article = await this.articleRepo.findOne({
      where: { slug, status: 'published' },
    });

    if (!article) {
      return { status: 'error', message: 'Article not found' };
    }

    // Get related articles (same page_title, exclude current)
    const related = await this.articleRepo.find({
      where: { status: 'published', page_title: article.page_title },
      order: { date_added: 'DESC' },
      take: 4,
    });

    return {
      status: 'success',
      data: {
        article_id: article.id,
        title: article.title,
        subtitle: article.subtitle,
        slug: article.slug,
        content: article.content,
        banner: imgUrl(article.banner),
        image2: imgUrl(article.image2),
        image3: imgUrl(article.image3),
        image4: imgUrl(article.image4),
        date_added: article.date_added,
        last_updated: article.last_updated,
        reading_time: article.reading_time,
        page_title: article.page_title,
        meta_title: article.meta_title,
        meta_description: article.meta_description,
        meta_keywords: article.meta_keywords,
        youtube_url: article.youtube_url,
        community_id: article.community_id,
        subcommunity_id: article.subcommunity_id,
      },
      related: related
        .filter((r) => r.id !== article.id)
        .slice(0, 3)
        .map((r) => ({
          article_id: r.id,
          title: r.title,
          slug: r.slug,
          banner: imgUrl(r.banner),
          date_added: r.date_added,
          reading_time: r.reading_time,
        })),
    };
  }

  // ──── Guides ────

  async guidesList(page = 1, limit = 10) {
    return this.blogsList(page, limit, 'guide');
  }

  // ──── FAQs ────

  async faqItems() {
    try {
      const faqs = await this.faqRepo.find({
        where: { status: 1 },
        order: { sort_order: 'ASC' },
      });

      return {
        status: 'success',
        data: faqs.map((f) => ({
          id: f.id,
          question: f.question,
          answer: f.answer,
          category: f.category,
          sort_order: f.sort_order,
        })),
      };
    } catch {
      // Table may not exist yet
      return { status: 'success', data: [] };
    }
  }

  // ──── Testimonials ────

  async testimonialList() {
    try {
      const teams = await this.teamRepo.find({
        where: { status: 1 },
        order: { sort_order: 'ASC' },
      });

      return {
        status: 'success',
        data: teams.map((t) => ({
          id: t.id,
          name: t.name,
          slug: t.slug,
          designation: t.designation,
          bio: t.bio,
          image: imgUrl(t.image),
          email: t.email,
          phone: t.phone,
          whatsapp: t.whatsapp,
          featured: t.featured,
        })),
      };
    } catch {
      return { status: 'success', data: [] };
    }
  }

  // ──── Home Slides (Banners) ────

  async homeSlides() {
    const banners = await this.bannerRepo.find({
      where: { status: 'A', is_trash: '0' },
      order: { priority: 'ASC' },
    });

    return {
      status: 'success',
      data: banners.map((b) => ({
        banner_id: b.id,
        image: imgUrl(b.image),
        link: b.link,
        priority: b.priority,
        ad_type: b.ad_type,
        script: b.script,
      })),
    };
  }

  // ──── Social Stories / Posts (stubs) ────

  async socialStories() {
    // mw_social_posts may not exist — return empty
    return { status: 'success', data: [] };
  }

  async socialPosts() {
    return { status: 'success', data: [] };
  }
}
