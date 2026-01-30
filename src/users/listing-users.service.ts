import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ListingUser } from '../entities';

export interface PaginationResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

@Injectable()
export class ListingUsersService {
  constructor(
    @InjectRepository(ListingUser)
    private listingUserRepository: Repository<ListingUser>,
  ) {}

  async findAll(
    page = 1,
    limit = 20,
    search?: string,
    status?: string,
    showTrashed?: boolean,
  ): Promise<PaginationResult<ListingUser>> {
    const skip = (page - 1) * limit;

    const qb = this.listingUserRepository.createQueryBuilder('user');

    if (!showTrashed) {
      qb.where('user.isTrash = :trash', { trash: 0 });
    }

    if (search) {
      qb.andWhere(
        '(user.first_name LIKE :search OR user.last_name LIKE :search OR user.email LIKE :search OR user.phone LIKE :search)',
        { search: `%${search}%` },
      );
    }

    if (status) {
      qb.andWhere('user.status = :status', { status });
    }

    qb.orderBy('user.date_added', 'DESC')
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

  async findOne(id: number): Promise<ListingUser> {
    const user = await this.listingUserRepository.findOne({
      where: { id },
    });
    if (!user) {
      throw new NotFoundException(`Listing user with ID ${id} not found`);
    }
    return user;
  }

  async update(id: number, data: Partial<ListingUser>): Promise<ListingUser> {
    const user = await this.findOne(id);
    Object.assign(user, data);
    return this.listingUserRepository.save(user);
  }

  async remove(id: number): Promise<void> {
    const user = await this.findOne(id);
    await this.listingUserRepository.remove(user);
  }

  async toggleTrash(id: number): Promise<ListingUser> {
    const user = await this.findOne(id);
    user.isTrash = user.isTrash === 1 ? 0 : 1;
    return this.listingUserRepository.save(user);
  }
}
