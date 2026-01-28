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
      return await this.projectRepository.find({
        where: { section_id: 3, is_trash: '0' },
        relations: ['developer'],
        order: { created_at: 'DESC' },
        take: limit,
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
      return await this.developerRepository.find({
        order: { created_at: 'DESC' },
        take: limit,
      });
    } catch {
      return [];
    }
  }
}
