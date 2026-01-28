import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Project, Developer } from '../entities';

export interface PaginationResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface CreateProjectDto {
  name: string;
  description?: string;
  featured_image?: string;
  list?: string;
  property?: string;
  status: string;
  trash?: string;
  developer_id?: number;
}

export interface UpdateProjectDto extends Partial<CreateProjectDto> {}

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
    @InjectRepository(Developer)
    private developerRepository: Repository<Developer>,
  ) {}

  async findAll(
    page = 1,
    limit = 12,
    search?: string,
    status?: string,
  ): Promise<PaginationResult<Project>> {
    const skip = (page - 1) * limit;

    const queryBuilder = this.projectRepository
      .createQueryBuilder('project')
      .leftJoinAndSelect('project.developer', 'developer')
      .orderBy('project.created_at', 'DESC');

    // Apply search filter
    if (search) {
      queryBuilder.andWhere('project.name LIKE :search', {
        search: `%${search}%`,
      });
    }

    // Apply status filter
    if (status) {
      queryBuilder.andWhere('project.status = :status', { status });
    }

    // Exclude trashed items by default
    queryBuilder.andWhere(
      "(project.trash IS NULL OR project.trash = '' OR project.trash = '0')",
    );

    const [data, total] = await queryBuilder
      .skip(skip)
      .take(limit)
      .getManyAndCount();

    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findOne(id: number): Promise<Project> {
    const project = await this.projectRepository.findOne({
      where: { id },
      relations: ['developer'],
    });

    if (!project) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }

    return project;
  }

  async create(createProjectDto: CreateProjectDto): Promise<Project> {
    const project = this.projectRepository.create({
      ...createProjectDto,
      trash: '0',
      created_at: new Date(),
      updated_at: new Date(),
    });

    return this.projectRepository.save(project);
  }

  async update(id: number, updateProjectDto: UpdateProjectDto): Promise<Project> {
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
    project.trash = '1';
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

  async getStats(): Promise<{ total: number; active: number; inactive: number }> {
    const total = await this.projectRepository.count({
      where: [{ trash: '0' }, { trash: '' }, { trash: null as any }],
    });

    const active = await this.projectRepository.count({
      where: [
        { status: 'A', trash: '0' },
        { status: 'A', trash: '' },
        { status: 'A', trash: null as any },
      ],
    });

    return {
      total,
      active,
      inactive: total - active,
    };
  }
}
