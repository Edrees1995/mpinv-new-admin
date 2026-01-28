import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import {
  Project,
  Developer,
  Community,
  Contact,
} from '../entities';

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
    @InjectRepository(Developer)
    private developerRepository: Repository<Developer>,
    @InjectRepository(Community)
    private communityRepository: Repository<Community>,
    @InjectRepository(Contact)
    private contactRepository: Repository<Contact>,
  ) {}

  async getStats() {
    try {
      const [
        projectsCount,
        developersCount,
        communitiesCount,
        contactsCount,
        unreadContactsCount,
      ] = await Promise.all([
        this.projectRepository.count(),
        this.developerRepository.count(),
        this.communityRepository.count(),
        this.contactRepository.count(),
        this.contactRepository.count({ where: { is_read: IsNull() } }),
      ]);

      return {
        properties: 'Bitrix24 API', // Properties come from Bitrix24 XML feeds
        projects: projectsCount,
        developers: developersCount,
        communities: communitiesCount,
        contacts: contactsCount,
        unreadContacts: unreadContactsCount,
      };
    } catch (error) {
      console.error('Stats error:', error);
      return {
        properties: 'Bitrix24 API',
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
