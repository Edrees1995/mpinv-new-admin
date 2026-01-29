import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Not, Equal } from 'typeorm';
import {
  OffplanProject,
  Developer,
  Community,
  Contact,
} from '../entities';
import { PropertiesService } from '../properties/properties.service';
import { ProjectsService } from '../projects/projects.service';

const IMAGE_BASE_URL = 'https://admin.mpinv.cloud/uploads/ads/';

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(OffplanProject)
    private projectRepository: Repository<OffplanProject>,
    @InjectRepository(Developer)
    private developerRepository: Repository<Developer>,
    @InjectRepository(Community)
    private communityRepository: Repository<Community>,
    @InjectRepository(Contact)
    private contactRepository: Repository<Contact>,
    private propertiesService: PropertiesService,
    private projectsService: ProjectsService,
  ) {}

  async getStats() {
    try {
      const [
        propertiesCount,
        projectsCount,
        developersCount,
        communitiesCount,
        contactsCount,
        unreadContactsCount,
      ] = await Promise.all([
        this.propertiesService.count(),
        this.projectsService.count(),
        this.developerRepository.count({ where: { is_trash: '0' } }),
        this.communityRepository.count(),
        this.contactRepository.count(),
        this.contactRepository.count({ where: { is_read: Not(Equal('1')) } }),
      ]);

      return {
        properties: propertiesCount,
        projects: projectsCount,
        developers: developersCount,
        communities: communitiesCount,
        contacts: contactsCount,
        unreadContacts: unreadContactsCount,
      };
    } catch (error) {
      console.error('Stats error:', error);
      return {
        properties: 0,
        projects: 0,
        developers: 0,
        communities: 0,
        contacts: 0,
        unreadContacts: 0,
      };
    }
  }

  async getRecentProjects(limit = 5) {
    try {
      const projects = await this.projectRepository.find({
        where: { section_id: 3, is_trash: '0' },
        relations: ['developer', 'images'],
        order: { created_at: 'DESC' },
        take: limit,
      });
      return projects.map((project) => {
        // Prepend base URL to image fields if they are filenames
        if (project.featured_image && !project.featured_image.startsWith('http')) {
          project.featured_image = IMAGE_BASE_URL + project.featured_image;
        }
        if (project.bg_img && !project.bg_img.startsWith('http')) {
          project.bg_img = IMAGE_BASE_URL + project.bg_img;
        }
        // Fallback: if featured_image is empty, use bg_img (ProfileImage) or first gallery image
        if (!project.featured_image) {
          if (project.bg_img) {
            project.featured_image = project.bg_img;
          } else if (project.images && project.images.length > 0) {
            const activeImage = project.images.find(
              (img) => img.is_trash === '0' && img.status === 'A',
            );
            if (activeImage) {
              project.featured_image = activeImage.image_name?.startsWith('http')
                ? activeImage.image_name
                : IMAGE_BASE_URL + activeImage.image_name;
            }
          }
        }
        return project;
      });
    } catch {
      return [];
    }
  }

  async getRecentContacts(limit = 5) {
    try {
      return await this.contactRepository.find({
        order: { date: 'DESC' },
        take: limit,
      });
    } catch {
      return [];
    }
  }

  async getRecentDevelopers(limit = 5) {
    try {
      const developers = await this.developerRepository.find({
        where: { is_trash: '0' },
        order: { created_at: 'DESC' },
        take: limit,
      });
      return developers.map((developer) => {
        if (developer.logo && !developer.logo.startsWith('http')) {
          developer.logo = IMAGE_BASE_URL + developer.logo;
        }
        return developer;
      });
    } catch {
      return [];
    }
  }
}
