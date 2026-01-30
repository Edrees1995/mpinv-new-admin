import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Contact } from '../entities';

export interface PaginationResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

@Injectable()
export class ContactsService {
  constructor(
    @InjectRepository(Contact)
    private contactRepository: Repository<Contact>,
  ) {}

  async findAll(
    page = 1,
    limit = 20,
    search?: string,
    contactType?: string,
    readStatus?: string,
  ): Promise<PaginationResult<Contact>> {
    const skip = (page - 1) * limit;

    const qb = this.contactRepository.createQueryBuilder('contact');

    if (search) {
      qb.where(
        '(contact.name LIKE :search OR contact.email LIKE :search OR contact.phone LIKE :search OR contact.message LIKE :search)',
        { search: `%${search}%` },
      );
    }

    if (contactType) {
      qb.andWhere('contact.contact_type = :contactType', { contactType });
    }

    if (readStatus === 'unread') {
      qb.andWhere('contact.is_read IS NULL');
    } else if (readStatus === 'read') {
      qb.andWhere('contact.is_read = :read', { read: '1' });
    }

    qb.orderBy('contact.date', 'DESC')
      .skip(skip)
      .take(limit);

    const [data, total] = await qb.getManyAndCount();

    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findOne(id: number): Promise<Contact> {
    const contact = await this.contactRepository.findOne({ where: { id } });
    if (!contact) {
      throw new NotFoundException(`Contact with ID ${id} not found`);
    }
    return contact;
  }

  async markAsRead(id: number): Promise<Contact> {
    const contact = await this.findOne(id);
    contact.is_read = '1';
    return this.contactRepository.save(contact);
  }

  async markAsUnread(id: number): Promise<Contact> {
    const contact = await this.findOne(id);
    contact.is_read = null as any;
    return this.contactRepository.save(contact);
  }

  async remove(id: number): Promise<void> {
    const contact = await this.findOne(id);
    await this.contactRepository.remove(contact);
  }

  async countUnread(): Promise<number> {
    return this.contactRepository.count({
      where: { is_read: null as any },
    });
  }
}
