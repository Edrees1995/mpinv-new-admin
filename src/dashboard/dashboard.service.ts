import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  Property,
  Project,
  Developer,
  Community,
  Contact,
  User,
} from '../entities';

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(Property)
    private propertyRepository: Repository<Property>,
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
    @InjectRepository(Developer)
    private developerRepository: Repository<Developer>,
    @InjectRepository(Community)
    private communityRepository: Repository<Community>,
    @InjectRepository(Contact)
    private contactRepository: Repository<Contact>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
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
        this.propertyRepository.count(),
        this.projectRepository.count(),
        this.developerRepository.count(),
        this.communityRepository.count(),
        this.contactRepository.count(),
        this.contactRepository.count({ where: { is_read: 0 } }),
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
      // Return zeros if database is not connected yet
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

  async getRecentProperties(limit = 5) {
    try {
      return await this.propertyRepository.find({
        order: { created_at: 'DESC' },
        take: limit,
        relations: ['category', 'community'],
      });
    } catch {
      return [];
    }
  }

  async getRecentProjects(limit = 5) {
    try {
      return await this.projectRepository.find({
        order: { created_at: 'DESC' },
        take: limit,
        relations: ['developer', 'community'],
      });
    } catch {
      return [];
    }
  }

  async getRecentContacts(limit = 5) {
    try {
      return await this.contactRepository.find({
        order: { created_at: 'DESC' },
        take: limit,
      });
    } catch {
      return [];
    }
  }
}
