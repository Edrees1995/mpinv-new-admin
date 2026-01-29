import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import {
  OffplanProject,
  Developer,
  Community,
  SubCommunity,
  Category,
  Subcategory,
  Setting,
  AdImage,
  AdPropertyType,
  AdFloorPlan,
  AdPaymentPlan,
} from '../../entities';

const IMAGE_BASE = 'https://admin.mpinv.cloud/uploads/ads/';

function imgUrl(url: string | null | undefined): string {
  if (!url) return '';
  if (url.startsWith('http')) return url;
  return IMAGE_BASE + url;
}

function settingVal(s: Setting | null | undefined): string {
  if (!s) return '';
  const v = s.option_value;
  return v instanceof Buffer ? v.toString('utf8') : String(v || '');
}

/** Parse URL filter segments: /community/dubai-marina/developer/emaar -> {community:'dubai-marina', developer:'emaar'} */
function parseFilterSegments(path: string): Record<string, string> {
  const filters: Record<string, string> = {};
  const parts = path.split('/').filter(Boolean);
  for (let i = 0; i < parts.length - 1; i += 2) {
    filters[parts[i]] = parts[i + 1];
  }
  return filters;
}

@Injectable()
export class ListingsApiService {
  constructor(
    @InjectRepository(OffplanProject)
    private projectRepo: Repository<OffplanProject>,
    @InjectRepository(Developer)
    private developerRepo: Repository<Developer>,
    @InjectRepository(Community)
    private communityRepo: Repository<Community>,
    @InjectRepository(SubCommunity)
    private subCommunityRepo: Repository<SubCommunity>,
    @InjectRepository(Category)
    private categoryRepo: Repository<Category>,
    @InjectRepository(Subcategory)
    private subcategoryRepo: Repository<Subcategory>,
    @InjectRepository(Setting)
    private settingRepo: Repository<Setting>,
    @InjectRepository(AdImage)
    private adImageRepo: Repository<AdImage>,
    @InjectRepository(AdPropertyType)
    private adPropertyTypeRepo: Repository<AdPropertyType>,
    @InjectRepository(AdFloorPlan)
    private adFloorPlanRepo: Repository<AdFloorPlan>,
    @InjectRepository(AdPaymentPlan)
    private adPaymentPlanRepo: Repository<AdPaymentPlan>,
  ) {}

  // ──── Transform helpers ────

  private transformProjectSummary(p: OffplanProject) {
    return {
      id: p.id,
      name: p.name,
      slug: p.slug,
      short_description: p.short_description,
      featured_image: imgUrl(p.featured_image),
      price: p.price,
      bedrooms: p.bedrooms,
      bathrooms: p.bathrooms,
      size: p.size,
      plot_size: p.plot_size,
      no_of_units: p.no_of_units,
      developer_id: p.developer_id,
      developer_name: p.developer_name || p.developer?.name,
      developer_logo: imgUrl(p.developer_logo || p.developer?.logo),
      community_id: p.community_id,
      community_name: p.community?.name,
      sub_community_id: p.sub_community_id,
      sub_community_name: p.subCommunity?.name,
      property_name: p.property_name,
      latitude: p.latitude,
      longitude: p.longitude,
      handover_date: p.handover_date,
      completion_year: p.completion_year,
      project_status: p.project_status,
      construction_status: p.construction_status,
      status: p.status,
      featured: p.featured,
      created_at: p.created_at,
      category_id: p.category_id,
      category_name: p.category?.name,
      images: (p.images || [])
        .filter((img) => img.is_trash === '0')
        .map((img) => ({
          id: img.id,
          image: imgUrl(img.image_name),
          title: img.title,
        })),
      property_types: (p.propertyTypes || []).map((pt) => ({
        id: pt.id,
        title: pt.title,
        bed: pt.bed,
        bath: pt.bath,
        size: pt.size,
        size_to: pt.size_to,
        from_price: pt.from_price,
        to_price: pt.to_price,
        image: imgUrl(pt.image),
      })),
    };
  }

  private transformProjectDetail(p: OffplanProject) {
    return {
      ...this.transformProjectSummary(p),
      description: p.description,
      developer_description: p.developer_description,
      youtube_url: p.youtube_url,
      video_link: p.video_link,
      floor_pdf: imgUrl(p.floor_pdf),
      payment_pdf: imgUrl(p.payment_pdf),
      brochure: imgUrl(p.brochure),
      brochure_link: p.brochure_link,
      highlights: p.highlights,
      // Classification
      sub_category_id: p.sub_category_id,
      type_of_project: p.type_of_project,
      off_plan: p.off_plan,
      listing_type: p.listing_type,
      // Timeline
      launch_date: p.launch_date,
      possession: p.possession,
      completion_date: p.completion_date,
      sale_status: p.sale_status,
      // Payment plan
      pay_plan: p.pay_plan,
      payment_plan: p.payment_plan,
      // Legal
      rera: p.rera,
      ref_no: p.ref_no,
      ded: p.ded,
      brn: p.brn,
      qr: p.qr,
      // Agent
      agent_name: p.agent_name,
      agent_phone: p.agent_phone,
      agent_email: p.agent_email,
      agent_logo: imgUrl(p.agent_logo),
      mobile_number: p.mobile_number,
      // SEO
      meta_title: p.meta_title,
      meta_keywords: p.meta_keywords,
      meta_description: p.meta_description,
      // Slider
      bg_img: imgUrl(p.bg_img),
      bg_img_mobile: imgUrl(p.bg_img_mobile),
      sliding: p.sliding,
      home_sliding: p.home_sliding,
      caption: p.caption,
      d_right: p.d_right,
      bg_attachment1: imgUrl(p.bg_attachment1),
      bg_attachment2: imgUrl(p.bg_attachment2),
      // Additional
      parking: p.parking,
      furnished: p.furnished,
      currency_abr: p.currency_abr,
      area_measurement: p.area_measurement,
      area_unit: p.area_unit,
      // Relations
      property_types: (p.propertyTypes || []).map((pt) => ({
        id: pt.id,
        title: pt.title,
        bed: pt.bed,
        bath: pt.bath,
        size: pt.size,
        size_to: pt.size_to,
        from_price: pt.from_price,
        to_price: pt.to_price,
        image: imgUrl(pt.image),
        floor_plan: imgUrl(pt.floor_plan),
        description: pt.description,
      })),
      floor_plans: (p.floorPlans || []).map((fp) => ({
        floor_id: fp.floor_id,
        floor_title: fp.floor_title,
        floor_file: imgUrl(fp.floor_file),
      })),
      payment_plans: (p.paymentPlans || []).map((pp) => ({
        row_id: pp.row_id,
        title: pp.title,
        description: pp.description,
        priority: pp.priority,
      })),
    };
  }

  /** Apply filter segments to a query builder */
  private async applyFilters(
    qb: SelectQueryBuilder<OffplanProject>,
    filters: Record<string, string>,
  ) {
    if (filters.community) {
      const community = await this.communityRepo.findOne({ where: { slug: filters.community } });
      if (community) {
        qb.andWhere('p.community_id = :communityId', { communityId: community.id });
      }
    }
    if (filters.developer) {
      const developer = await this.developerRepo.findOne({ where: { slug: filters.developer } });
      if (developer) {
        qb.andWhere('p.developer_id = :developerId', { developerId: developer.id });
      }
    }
    if (filters.category) {
      const category = await this.categoryRepo.findOne({ where: { slug: filters.category } });
      if (category) {
        qb.andWhere('p.category_id = :categoryId', { categoryId: category.id });
      }
    }
    if (filters.subcategory) {
      const subcategory = await this.subcategoryRepo.findOne({ where: { slug: filters.subcategory } });
      if (subcategory) {
        qb.andWhere('p.sub_category_id = :subcategoryId', { subcategoryId: subcategory.id });
      }
    }
    if (filters.bedrooms) {
      qb.andWhere('p.bedrooms = :bedrooms', { bedrooms: filters.bedrooms });
    }
    if (filters.status) {
      qb.andWhere('p.project_status = :projectStatus', { projectStatus: filters.status });
    }
    if (filters.price_from) {
      qb.andWhere('p.price >= :priceFrom', { priceFrom: Number(filters.price_from) });
    }
    if (filters.price_to) {
      qb.andWhere('p.price <= :priceTo', { priceTo: Number(filters.price_to) });
    }
  }

  // ──── Offplan Home ────

  async offplanHome() {
    const projects = await this.projectRepo.find({
      where: { section_id: 3, is_trash: '0', status: 'A' },
      relations: ['developer', 'community', 'subCommunity', 'category', 'images', 'propertyTypes'],
      order: { created_at: 'DESC' },
      take: 12,
    });

    const premiumProjects = await this.projectRepo.find({
      where: { section_id: 3, is_trash: '0', status: 'A', featured: 'Y' },
      relations: ['developer', 'community', 'images', 'propertyTypes'],
      order: { created_at: 'DESC' },
      take: 6,
    });

    const communities = await this.communityRepo.find({
      where: { featured: '1' },
      order: { priority: 'ASC' },
      take: 10,
    });

    // SEO content from settings
    const seoSetting = await this.settingRepo.findOne({
      where: { category: 'offplan', option_key: 'seo_content' },
    });

    return {
      status: 'success',
      data: projects.map((p) => this.transformProjectSummary(p)),
      premium: premiumProjects.map((p) => this.transformProjectSummary(p)),
      community: communities.map((c) => ({
        community_id: c.id,
        community_name: c.name,
        slug: c.slug,
        image: imgUrl(c.image),
      })),
      seoContent: settingVal(seoSetting),
    };
  }

  // ──── Offplan Listings with Filters ────

  async offplanListings(filterPath: string, page = 1, limit = 12, sort?: string) {
    const filters = parseFilterSegments(filterPath);

    const qb = this.projectRepo.createQueryBuilder('p')
      .leftJoinAndSelect('p.developer', 'dev')
      .leftJoinAndSelect('p.community', 'comm')
      .leftJoinAndSelect('p.subCommunity', 'subComm')
      .leftJoinAndSelect('p.category', 'cat')
      .leftJoinAndSelect('p.images', 'img', 'img.isTrash = :imgTrash', { imgTrash: '0' })
      .leftJoinAndSelect('p.propertyTypes', 'pt')
      .where('p.section_id = :section', { section: 3 })
      .andWhere('p.isTrash = :trash', { trash: '0' })
      .andWhere('p.status = :status', { status: 'A' });

    await this.applyFilters(qb, filters);

    // Sorting
    if (sort === 'price_asc') {
      qb.orderBy('p.price', 'ASC');
    } else if (sort === 'price_desc') {
      qb.orderBy('p.price', 'DESC');
    } else if (sort === 'newest') {
      qb.orderBy('p.date_added', 'DESC');
    } else {
      qb.orderBy('p.featured', 'DESC').addOrderBy('p.date_added', 'DESC');
    }

    qb.skip((page - 1) * limit).take(limit);

    const [projects, total] = await qb.getManyAndCount();

    return {
      status: 'success',
      data: projects.map((p) => this.transformProjectSummary(p)),
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
      filters,
    };
  }

  // ──── Offplan Detail ────

  async offplanDetail(slug: string) {
    const project = await this.projectRepo.findOne({
      where: { slug, section_id: 3, is_trash: '0' },
      relations: [
        'developer', 'community', 'subCommunity', 'category', 'subcategory',
        'images', 'propertyTypes', 'floorPlans', 'paymentPlans',
      ],
    });

    if (!project) {
      return { status: 'error', message: 'Project not found' };
    }

    return {
      status: 'success',
      data: this.transformProjectDetail(project),
    };
  }

  // ──── For-Sale Listings with Filters ────

  async saleListings(filterPath: string, page = 1, limit = 12, sort?: string) {
    const filters = parseFilterSegments(filterPath);

    const qb = this.projectRepo.createQueryBuilder('p')
      .leftJoinAndSelect('p.developer', 'dev')
      .leftJoinAndSelect('p.community', 'comm')
      .leftJoinAndSelect('p.subCommunity', 'subComm')
      .leftJoinAndSelect('p.category', 'cat')
      .leftJoinAndSelect('p.images', 'img', 'img.isTrash = :imgTrash', { imgTrash: '0' })
      .leftJoinAndSelect('p.propertyTypes', 'pt')
      .where('p.section_id = :section', { section: 1 })
      .andWhere('p.isTrash = :trash', { trash: '0' })
      .andWhere('p.status = :status', { status: 'A' });

    await this.applyFilters(qb, filters);

    // Sorting
    if (sort === 'price_asc') {
      qb.orderBy('p.price', 'ASC');
    } else if (sort === 'price_desc') {
      qb.orderBy('p.price', 'DESC');
    } else if (sort === 'newest') {
      qb.orderBy('p.date_added', 'DESC');
    } else {
      qb.orderBy('p.featured', 'DESC').addOrderBy('p.date_added', 'DESC');
    }

    qb.skip((page - 1) * limit).take(limit);

    const [projects, total] = await qb.getManyAndCount();

    return {
      status: 'success',
      data: projects.map((p) => this.transformProjectSummary(p)),
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
      filters,
    };
  }

  // ──── Property Detail (for-sale) ────

  async propertyDetail(slug: string) {
    const project = await this.projectRepo.findOne({
      where: { slug, section_id: 1, is_trash: '0' },
      relations: [
        'developer', 'community', 'subCommunity', 'category', 'subcategory',
        'images', 'propertyTypes', 'floorPlans', 'paymentPlans',
      ],
    });

    if (!project) {
      return { status: 'error', message: 'Property not found' };
    }

    return {
      status: 'success',
      data: this.transformProjectDetail(project),
    };
  }

  // ──── Area/Community Detail ────

  async detailArea(slug: string) {
    const community = await this.communityRepo.findOne({
      where: { slug },
      relations: ['subCommunities'],
    });

    if (!community) {
      return { status: 'error', message: 'Area not found' };
    }

    // Get projects in this community
    const projects = await this.projectRepo.find({
      where: { community_id: community.id, is_trash: '0', status: 'A' },
      relations: ['developer', 'images', 'propertyTypes'],
      order: { created_at: 'DESC' },
      take: 12,
    });

    return {
      status: 'success',
      data: {
        community_id: community.id,
        community_name: community.name,
        slug: community.slug,
        image: imgUrl(community.image),
        image2: imgUrl(community.image2),
        meta_title: community.meta_title,
        meta_description: community.meta_description,
        sub_communities: (community.subCommunities || []).map((sc) => ({
          sub_community_id: sc.id,
          sub_community_name: sc.name,
          slug: sc.slug,
        })),
        projects: projects.map((p) => this.transformProjectSummary(p)),
      },
    };
  }

  // ──── Area Guide Detail ────

  async areaguideDetail(id: string) {
    // id could be a numeric ID or slug
    const isNumeric = /^\d+$/.test(id);
    let community: Community | null;
    if (isNumeric) {
      community = await this.communityRepo.findOne({
        where: { id: Number(id) },
        relations: ['subCommunities'],
      });
    } else {
      community = await this.communityRepo.findOne({
        where: { slug: id },
        relations: ['subCommunities'],
      });
    }

    if (!community) {
      return { status: 'error', message: 'Area guide not found' };
    }

    return {
      status: 'success',
      data: {
        community_id: community.id,
        community_name: community.name,
        slug: community.slug,
        image: imgUrl(community.image),
        meta_title: community.meta_title,
        meta_description: community.meta_description,
        sub_communities: (community.subCommunities || []).map((sc) => ({
          sub_community_id: sc.id,
          sub_community_name: sc.name,
          slug: sc.slug,
        })),
      },
    };
  }

  // ──── Similar Listings ────

  async similarListings(propertyId: number) {
    const property = await this.projectRepo.findOne({
      where: { id: propertyId },
    });

    if (!property) {
      return { status: 'success', data: [] };
    }

    const qb = this.projectRepo.createQueryBuilder('p')
      .leftJoinAndSelect('p.developer', 'dev')
      .leftJoinAndSelect('p.community', 'comm')
      .leftJoinAndSelect('p.images', 'img', 'img.isTrash = :imgTrash', { imgTrash: '0' })
      .leftJoinAndSelect('p.propertyTypes', 'pt')
      .where('p.id != :id', { id: propertyId })
      .andWhere('p.isTrash = :trash', { trash: '0' })
      .andWhere('p.status = :status', { status: 'A' })
      .andWhere('p.section_id = :section', { section: property.section_id });

    // Match by community or category
    if (property.community_id) {
      qb.andWhere('p.community_id = :communityId', { communityId: property.community_id });
    } else if (property.category_id) {
      qb.andWhere('p.category_id = :categoryId', { categoryId: property.category_id });
    }

    qb.orderBy('p.date_added', 'DESC').take(6);

    const similar = await qb.getMany();

    return {
      status: 'success',
      data: similar.map((p) => this.transformProjectSummary(p)),
    };
  }

  // ──── Property List (grouped by developer) ────

  async propertyList() {
    const developers = await this.developerRepo.find({
      where: { is_trash: '0', status: 'A' },
      order: { priority: 'ASC', name: 'ASC' },
    });

    const result: Array<Record<string, any>> = [];
    for (const dev of developers) {
      const projects = await this.projectRepo.find({
        where: { developer_id: dev.id, is_trash: '0', status: 'A' },
        relations: ['community', 'images'],
        order: { created_at: 'DESC' },
        take: 6,
      });

      if (projects.length > 0) {
        result.push({
          developer_id: dev.id,
          developer_name: dev.name,
          slug: dev.slug,
          logo: imgUrl(dev.logo),
          projects: projects.map((p) => this.transformProjectSummary(p)),
        });
      }
    }

    return { status: 'success', data: result };
  }
}
