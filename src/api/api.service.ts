import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import {
  OffplanProject,
  Developer,
  Community,
  SubCommunity,
  AdImage,
  AdPropertyType,
  Contact,
  Setting,
  Article,
  Banner,
} from '../entities';

// Image base URL for the admin
const OLD_IMAGE_BASE_URL = 'https://admin.mpinv.cloud/uploads/ads/';

@Injectable()
export class ApiService {
  constructor(
    @InjectRepository(OffplanProject)
    private projectRepository: Repository<OffplanProject>,
    @InjectRepository(Developer)
    private developerRepository: Repository<Developer>,
    @InjectRepository(Community)
    private communityRepository: Repository<Community>,
    @InjectRepository(SubCommunity)
    private subCommunityRepository: Repository<SubCommunity>,
    @InjectRepository(AdImage)
    private adImageRepository: Repository<AdImage>,
    @InjectRepository(AdPropertyType)
    private adPropertyTypeRepository: Repository<AdPropertyType>,
    @InjectRepository(Contact)
    private contactRepository: Repository<Contact>,
    @InjectRepository(Setting)
    private settingRepository: Repository<Setting>,
    @InjectRepository(Article)
    private articleRepository: Repository<Article>,
    @InjectRepository(Banner)
    private bannerRepository: Repository<Banner>,
  ) {}

  // Transform image URL - add base URL if needed
  private transformImageUrl(url: string | null | undefined): string {
    if (!url) return '';
    if (url.startsWith('http')) return url;
    return OLD_IMAGE_BASE_URL + url;
  }

  // Offplan Projects for homepage
  async getOffplanHome() {
    const projects = await this.projectRepository.find({
      where: { section_id: 3, is_trash: '0', status: 'A' },
      relations: ['developer', 'community', 'images', 'propertyTypes'],
      order: { created_at: 'DESC' },
      take: 12,
    });

    return {
      status: 'success',
      data: projects.map((p) => this.transformProject(p)),
    };
  }

  // Offplan Project Detail
  async getOffplanDetail(slug: string) {
    const project = await this.projectRepository.findOne({
      where: { slug, section_id: 3, is_trash: '0' },
      relations: ['developer', 'community', 'images', 'propertyTypes'],
    });

    if (!project) {
      return { status: 'error', message: 'Project not found' };
    }

    return {
      status: 'success',
      data: this.transformProject(project),
    };
  }

  // Developers List
  async getDevelopersList() {
    const developers = await this.developerRepository.find({
      where: { is_trash: '0' },
      order: { name: 'ASC' },
    });

    return {
      status: 'success',
      data: developers.map((d) => ({
        ...d,
        logo: this.transformImageUrl(d.logo),
      })),
    };
  }

  // Community List
  async getCommunityList() {
    const communities = await this.communityRepository.find({
      order: { name: 'ASC' },
    });

    return {
      status: 'success',
      data: communities.map((c) => ({
        ...c,
        image: this.transformImageUrl(c.image),
      })),
    };
  }

  // Footer Variables (settings)
  async getFooterVariables() {
    const settings = await this.settingRepository.find();
    const settingsMap: Record<string, string> = {};
    settings.forEach((s) => {
      // Convert Buffer to string
      const value = s.option_value instanceof Buffer
        ? s.option_value.toString('utf8')
        : String(s.option_value || '');
      settingsMap[s.option_key] = value;
    });

    return {
      status: 'success',
      data: settingsMap,
    };
  }

  // Contact Variables
  async getContactVariables() {
    const settings = await this.settingRepository.find({
      where: [
        { option_key: Like('%contact%') },
        { option_key: Like('%phone%') },
        { option_key: Like('%email%') },
        { option_key: Like('%address%') },
      ],
    });
    const settingsMap: Record<string, string> = {};
    settings.forEach((s) => {
      // Convert Buffer to string
      const value = s.option_value instanceof Buffer
        ? s.option_value.toString('utf8')
        : String(s.option_value || '');
      settingsMap[s.option_key] = value;
    });

    return {
      status: 'success',
      data: settingsMap,
    };
  }

  // FAQ Items
  async getFaqItems() {
    // Note: mw_faq table doesn't exist, mw_ad_faq is property-specific
    // Return empty array for now until FAQ table is created
    return {
      status: 'success',
      data: [],
    };
  }

  // Testimonials
  async getTestimonialList() {
    // Note: mw_teams table doesn't exist
    // Return empty array for now until Team/Testimonial table is created
    return {
      status: 'success',
      data: [],
    };
  }

  // Blogs/Articles List
  async getBlogsList(page = 1, limit = 10) {
    const [articles, total] = await this.articleRepository.findAndCount({
      where: { status: 'published' },
      order: { date_added: 'DESC' },
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      status: 'success',
      data: articles.map((a) => ({
        ...a,
        image: this.transformImageUrl(a.banner),
      })),
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  // Article Detail
  async getArticleDetail(slug: string) {
    const article = await this.articleRepository.findOne({
      where: { slug, status: 'published' },
    });

    if (!article) {
      return { status: 'error', message: 'Article not found' };
    }

    return {
      status: 'success',
      data: {
        ...article,
        image: this.transformImageUrl(article.banner),
      },
    };
  }

  // Home Slides (Banners)
  async getHomeSlides() {
    const banners = await this.bannerRepository.find({
      where: { status: 'A', is_trash: '0' },
      order: { priority: 'ASC' },
    });

    return {
      status: 'success',
      data: banners.map((b) => ({
        ...b,
        image: this.transformImageUrl(b.image),
      })),
    };
  }

  // Submit Contact Form
  async submitContact(data: {
    name: string;
    email: string;
    phone?: string;
    subject?: string;
    message: string;
  }) {
    const contact = this.contactRepository.create({
      name: data.name,
      email: data.email,
      phone: data.phone || '',
      message: data.subject ? `${data.subject}: ${data.message}` : data.message,
      date: new Date(),
      is_read: '0',
      type: 1,
      contact_type: 'CONTACT',
    });

    await this.contactRepository.save(contact);

    return {
      status: 'success',
      message: 'Message sent successfully',
    };
  }

  // Transform project with full image URLs
  private transformProject(project: OffplanProject) {
    return {
      id: project.id,
      name: project.name,
      slug: project.slug,
      description: project.description,
      short_description: project.short_description,
      featured_image: this.transformImageUrl(project.featured_image),
      price: project.price,
      bedrooms: project.bedrooms,
      bathrooms: project.bathrooms,
      size: project.size,
      plot_size: project.plot_size,
      no_of_units: project.no_of_units,
      developer_id: project.developer_id,
      developer_name: project.developer_name || project.developer?.name,
      developer_logo: this.transformImageUrl(project.developer_logo || project.developer?.logo),
      community_id: project.community_id,
      community_name: project.community?.name,
      property_name: project.property_name,
      latitude: project.latitude,
      longitude: project.longitude,
      handover_date: project.handover_date,
      completion_year: project.completion_year,
      project_status: project.project_status,
      status: project.status,
      featured: project.featured,
      youtube_url: project.youtube_url,
      video_link: project.video_link,
      floor_pdf: this.transformImageUrl(project.floor_pdf),
      payment_pdf: this.transformImageUrl(project.payment_pdf),
      brochure: this.transformImageUrl(project.brochure),
      brochure_link: project.brochure_link,
      highlights: project.highlights,
      created_at: project.created_at,
      images: project.images
        ?.filter((img) => img.is_trash === '0')
        .map((img) => ({
          id: img.id,
          image: this.transformImageUrl(img.image_name),
        })) || [],
      property_types: project.propertyTypes?.map((pt) => ({
        id: pt.id,
        title: pt.title,
        bed: pt.bed,
        bath: pt.bath,
        size: pt.size,
        size_to: pt.size_to,
        from_price: pt.from_price,
        to_price: pt.to_price,
        image: this.transformImageUrl(pt.image),
        floor_plan: this.transformImageUrl(pt.floor_plan),
      })) || [],
    };
  }
}
