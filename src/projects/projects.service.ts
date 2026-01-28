import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OffplanProject, Developer, Community, SubCommunity, Category, Subcategory, AdImage, AdPropertyType, AdFloorPlan, AdPaymentPlan } from '../entities';

// Base URL for images stored in the old admin panel
const IMAGE_BASE_URL = 'https://admin.mpinv.cloud/uploads/ads/';
const OFFPLAN_SECTION_ID = 3;

export interface PaginationResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface CreateProjectDto {
  name: string;
  slug: string;
  description?: string;
  short_description?: string;
  featured_image?: string;
  price?: number;
  bedrooms?: string;
  bathrooms?: string;
  size?: string;
  plot_size?: string;
  no_of_units?: string;
  developer_id?: number;
  developer_name?: string;
  community_id?: number;
  sub_community_id?: number;
  handover_date?: Date;
  completion_year?: string;
  project_status?: string;
  youtube_url?: string;
  highlights?: string;
  status?: string;
  featured?: string;
  // Category / Classification
  category_id?: number;
  sub_category_id?: number;
  type_of_project?: string;
  off_plan?: string;
  listing_type?: string;
  // Timeline / Sales
  launch_date?: Date;
  possession?: Date;
  completion_date?: Date;
  sale_status?: string;
  // Payment Plan
  pay_plan?: string;
  payment_plan?: string;
  // Registration / Legal
  rera?: string;
  ref_no?: string;
  ded?: string;
  brn?: string;
  qr?: string;
  // Agent Info
  agent_name?: string;
  agent_phone?: string;
  agent_email?: string;
  agent_logo?: string;
  mobile_number?: string;
  // SEO
  meta_title?: string;
  meta_keywords?: string;
  meta_description?: string;
  // Slider / Background Images
  bg_img?: string;
  bg_img_mobile?: string;
  sliding?: string;
  home_sliding?: string;
  caption?: string;
  d_right?: string;
  bg_attachment1?: string;
  bg_attachment2?: string;
  // Additional Details
  parking?: string;
  furnished?: string;
  currency_abr?: string;
  area_measurement?: string;
  area_unit?: number;
}

export interface UpdateProjectDto extends Partial<CreateProjectDto> {}

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(OffplanProject)
    private projectRepository: Repository<OffplanProject>,
    @InjectRepository(Developer)
    private developerRepository: Repository<Developer>,
    @InjectRepository(Community)
    private communityRepository: Repository<Community>,
    @InjectRepository(SubCommunity)
    private subCommunityRepository: Repository<SubCommunity>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    @InjectRepository(Subcategory)
    private subcategoryRepository: Repository<Subcategory>,
    @InjectRepository(AdImage)
    private adImageRepository: Repository<AdImage>,
    @InjectRepository(AdPropertyType)
    private adPropertyTypeRepository: Repository<AdPropertyType>,
    @InjectRepository(AdFloorPlan)
    private adFloorPlanRepository: Repository<AdFloorPlan>,
    @InjectRepository(AdPaymentPlan)
    private adPaymentPlanRepository: Repository<AdPaymentPlan>,
  ) {}

  // Transform project to include full image URLs
  private transformProject(project: OffplanProject): OffplanProject {
    if (project.featured_image && !project.featured_image.startsWith('http')) {
      project.featured_image = IMAGE_BASE_URL + project.featured_image;
    }
    if (project.developer_logo && !project.developer_logo.startsWith('http')) {
      project.developer_logo = IMAGE_BASE_URL + project.developer_logo;
    }
    if (project.floor_pdf && !project.floor_pdf.startsWith('http')) {
      project.floor_pdf = IMAGE_BASE_URL + project.floor_pdf;
    }
    if (project.payment_pdf && !project.payment_pdf.startsWith('http')) {
      project.payment_pdf = IMAGE_BASE_URL + project.payment_pdf;
    }
    if (project.brochure && !project.brochure.startsWith('http')) {
      project.brochure = IMAGE_BASE_URL + project.brochure;
    }
    // Also transform developer logo if loaded via relation
    if (project.developer?.logo && !project.developer.logo.startsWith('http')) {
      project.developer.logo = IMAGE_BASE_URL + project.developer.logo;
    }
    // Transform new image fields
    if (project.bg_img && !project.bg_img.startsWith('http')) {
      project.bg_img = IMAGE_BASE_URL + project.bg_img;
    }
    if (project.bg_img_mobile && !project.bg_img_mobile.startsWith('http')) {
      project.bg_img_mobile = IMAGE_BASE_URL + project.bg_img_mobile;
    }
    if (project.d_right && !project.d_right.startsWith('http')) {
      project.d_right = IMAGE_BASE_URL + project.d_right;
    }
    if (project.bg_attachment1 && !project.bg_attachment1.startsWith('http')) {
      project.bg_attachment1 = IMAGE_BASE_URL + project.bg_attachment1;
    }
    if (project.bg_attachment2 && !project.bg_attachment2.startsWith('http')) {
      project.bg_attachment2 = IMAGE_BASE_URL + project.bg_attachment2;
    }
    if (project.agent_logo && !project.agent_logo.startsWith('http')) {
      project.agent_logo = IMAGE_BASE_URL + project.agent_logo;
    }
    if (project.qr && !project.qr.startsWith('http')) {
      project.qr = IMAGE_BASE_URL + project.qr;
    }
    // Transform gallery images
    if (project.images && project.images.length > 0) {
      project.images = project.images
        .filter((img) => img.is_trash === '0' && img.status === 'A')
        .map((img) => {
          if (img.image_name && !img.image_name.startsWith('http')) {
            img.image_name = IMAGE_BASE_URL + img.image_name;
          }
          return img;
        });
    }
    // Transform property type images and floor plans
    // Handle both old admin (filename only) and new admin (full URL) formats
    if (project.propertyTypes && project.propertyTypes.length > 0) {
      project.propertyTypes = project.propertyTypes.map((pt) => {
        if (pt.image && !pt.image.startsWith('http')) {
          pt.image = IMAGE_BASE_URL + pt.image;
        }
        if (pt.floor_plan && !pt.floor_plan.startsWith('http')) {
          pt.floor_plan = IMAGE_BASE_URL + pt.floor_plan;
        }
        return pt;
      });
    }
    // Transform floor plan files
    if (project.floorPlans && project.floorPlans.length > 0) {
      project.floorPlans = project.floorPlans.map((fp) => {
        if (fp.floor_file && !fp.floor_file.startsWith('http')) {
          fp.floor_file = IMAGE_BASE_URL + fp.floor_file;
        }
        return fp;
      });
    }
    return project;
  }

  async findAll(
    page = 1,
    limit = 12,
    search?: string,
    status?: string,
    featured?: string,
  ): Promise<PaginationResult<OffplanProject>> {
    const skip = (page - 1) * limit;

    const queryBuilder = this.projectRepository
      .createQueryBuilder('project')
      .leftJoinAndSelect('project.developer', 'developer')
      .leftJoinAndSelect('project.community', 'community')
      .where('project.section_id = :sectionId', { sectionId: OFFPLAN_SECTION_ID })
      .orderBy('project.created_at', 'DESC');

    // Apply search filter
    if (search) {
      queryBuilder.andWhere(
        '(project.name LIKE :search OR project.slug LIKE :search OR project.developer_name LIKE :search)',
        { search: `%${search}%` },
      );
    }

    // Apply status filter
    if (status) {
      queryBuilder.andWhere('project.status = :status', { status });
    }

    // Apply featured filter
    if (featured) {
      queryBuilder.andWhere('project.featured = :featured', { featured });
    }

    // Exclude trashed items by default
    queryBuilder.andWhere("project.is_trash = '0'");

    const [data, total] = await queryBuilder
      .skip(skip)
      .take(limit)
      .getManyAndCount();

    return {
      data: data.map((project) => this.transformProject(project)),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findOne(id: number): Promise<OffplanProject> {
    const project = await this.projectRepository.findOne({
      where: { id, section_id: OFFPLAN_SECTION_ID },
      relations: ['developer', 'community', 'subCommunity', 'category', 'subcategory', 'images', 'propertyTypes', 'floorPlans', 'paymentPlans'],
    });

    if (!project) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }

    return this.transformProject(project);
  }

  async findBySlug(slug: string): Promise<OffplanProject> {
    const project = await this.projectRepository.findOne({
      where: { slug, section_id: OFFPLAN_SECTION_ID },
      relations: ['developer', 'community', 'subCommunity', 'category', 'subcategory', 'images', 'propertyTypes', 'floorPlans', 'paymentPlans'],
    });

    if (!project) {
      throw new NotFoundException(`Project with slug ${slug} not found`);
    }

    return this.transformProject(project);
  }

  async create(createProjectDto: CreateProjectDto): Promise<OffplanProject> {
    const project = this.projectRepository.create({
      ...createProjectDto,
      section_id: OFFPLAN_SECTION_ID,
      is_trash: '0',
      status: createProjectDto.status || 'A',
      featured: createProjectDto.featured || 'N',
      created_at: new Date(),
      updated_at: new Date(),
    });

    return this.projectRepository.save(project);
  }

  async update(id: number, updateProjectDto: UpdateProjectDto): Promise<OffplanProject> {
    const project = await this.findOne(id);

    Object.assign(project, {
      ...updateProjectDto,
      updated_at: new Date(),
    });

    return this.projectRepository.save(project);
  }

  async remove(id: number): Promise<void> {
    const project = await this.findOne(id);
    // Soft delete by setting trash flag
    project.is_trash = '1';
    project.updated_at = new Date();
    await this.projectRepository.save(project);
  }

  async restore(id: number): Promise<void> {
    const project = await this.projectRepository.findOne({
      where: { id, section_id: OFFPLAN_SECTION_ID },
    });
    if (!project) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }
    project.is_trash = '0';
    project.updated_at = new Date();
    await this.projectRepository.save(project);
  }

  async hardDelete(id: number): Promise<void> {
    const project = await this.findOne(id);
    await this.projectRepository.remove(project);
  }

  async getAllDevelopers(): Promise<Developer[]> {
    return this.developerRepository.find({
      where: { is_trash: '0' },
      order: { name: 'ASC' },
    });
  }

  async getAllCommunities(): Promise<Community[]> {
    return this.communityRepository.find({
      order: { name: 'ASC' },
    });
  }

  async getAllSubCommunities(): Promise<SubCommunity[]> {
    return this.subCommunityRepository.find({
      order: { name: 'ASC' },
    });
  }

  async getAllCategories(): Promise<Category[]> {
    return this.categoryRepository.find({
      order: { name: 'ASC' },
    });
  }

  async getAllSubcategories(): Promise<Subcategory[]> {
    return this.subcategoryRepository.find({
      order: { name: 'ASC' },
    });
  }

  async getStats(): Promise<{ total: number; active: number; inactive: number; featured: number }> {
    const total = await this.projectRepository.count({
      where: { section_id: OFFPLAN_SECTION_ID, is_trash: '0' },
    });

    const active = await this.projectRepository.count({
      where: { section_id: OFFPLAN_SECTION_ID, is_trash: '0', status: 'A' },
    });

    const featured = await this.projectRepository.count({
      where: { section_id: OFFPLAN_SECTION_ID, is_trash: '0', featured: 'Y' },
    });

    return {
      total,
      active,
      inactive: total - active,
      featured,
    };
  }

  async count(): Promise<number> {
    return this.projectRepository.count({
      where: { section_id: OFFPLAN_SECTION_ID, is_trash: '0' },
    });
  }

  // Get trashed projects for restore functionality
  async findTrashed(
    page = 1,
    limit = 12,
  ): Promise<PaginationResult<OffplanProject>> {
    const skip = (page - 1) * limit;

    const [data, total] = await this.projectRepository.findAndCount({
      where: { section_id: OFFPLAN_SECTION_ID, is_trash: '1' },
      relations: ['developer', 'community'],
      order: { updated_at: 'DESC' },
      skip,
      take: limit,
    });

    return {
      data: data.map((project) => this.transformProject(project)),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  // Property Types Management
  async updatePropertyTypes(projectId: number, propertyTypes: any[]): Promise<void> {
    if (!propertyTypes || !Array.isArray(propertyTypes)) return;

    const NEW_ADMIN_IMAGE_URL = 'https://new-admin.mpinv.cloud/uploads/ads/';

    for (const pt of propertyTypes) {
      // Handle image URLs - keep full URL for new admin uploads, strip old admin base URL
      let image = pt.image || '';
      let floorPlan = pt.floor_plan || '';

      // If it's a new admin URL, store the full URL
      // If it's an old admin URL, strip the base to store just filename
      // If it's just a filename, keep it as is
      if (image.startsWith(IMAGE_BASE_URL)) {
        image = image.replace(IMAGE_BASE_URL, '');
      }
      // Keep new admin full URLs as-is
      if (floorPlan.startsWith(IMAGE_BASE_URL)) {
        floorPlan = floorPlan.replace(IMAGE_BASE_URL, '');
      }

      const propertyTypeData = {
        ad_id: projectId,
        title: pt.title || '',
        bed: parseInt(pt.bed) || 0,
        bath: parseInt(pt.bath) || 0,
        size: parseFloat(pt.size) || 0,
        size_to: parseFloat(pt.size_to) || 0,
        from_price: parseFloat(pt.from_price) || 0,
        to_price: parseFloat(pt.to_price) || 0,
        description: pt.description || '',
        image: image,
        floor_plan: floorPlan,
        last_updated: new Date(),
      };

      if (pt.id && pt.id !== '') {
        // Update existing property type
        await this.adPropertyTypeRepository.update(pt.id, propertyTypeData);
      } else {
        // Create new property type
        const newPropertyType = this.adPropertyTypeRepository.create(propertyTypeData);
        await this.adPropertyTypeRepository.save(newPropertyType);
      }
    }
  }

  async deletePropertyType(id: number): Promise<void> {
    const result = await this.adPropertyTypeRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Property type with ID ${id} not found`);
    }
  }

  async getPropertyType(id: number): Promise<AdPropertyType> {
    const propertyType = await this.adPropertyTypeRepository.findOne({
      where: { id },
    });
    if (!propertyType) {
      throw new NotFoundException(`Property type with ID ${id} not found`);
    }
    return propertyType;
  }

  async updatePropertyTypeImage(
    propertyTypeId: number,
    imageType: string,
    filename: string,
  ): Promise<void> {
    const propertyType = await this.getPropertyType(propertyTypeId);

    if (imageType === 'image') {
      propertyType.image = filename;
    } else if (imageType === 'floor_plan') {
      propertyType.floor_plan = filename;
    }

    propertyType.last_updated = new Date();
    await this.adPropertyTypeRepository.save(propertyType);
  }
}
