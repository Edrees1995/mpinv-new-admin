import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OffplanProject, Developer, Community } from '../entities';

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
  handover_date?: Date;
  completion_year?: string;
  project_status?: string;
  youtube_url?: string;
  highlights?: string;
  status?: string;
  featured?: string;
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
      relations: ['developer', 'community'],
    });

    if (!project) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }

    return this.transformProject(project);
  }

  async findBySlug(slug: string): Promise<OffplanProject> {
    const project = await this.projectRepository.findOne({
      where: { slug, section_id: OFFPLAN_SECTION_ID },
      relations: ['developer', 'community'],
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
}
