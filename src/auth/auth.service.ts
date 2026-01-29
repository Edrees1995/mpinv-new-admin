import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { User } from '../entities';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.userRepo.findOne({ where: { email } });
    if (!user) return null;
    if (user.status !== 'active') return null;

    const hash = user.password;

    // bcrypt hash ($2y$ from PHP or $2a$/$2b$ from node)
    if (hash.startsWith('$2y$') || hash.startsWith('$2a$') || hash.startsWith('$2b$')) {
      // PHP uses $2y$, bcryptjs expects $2a$ — they're compatible
      const normalized = hash.replace(/^\$2y\$/, '$2a$');
      const valid = await bcrypt.compare(password, normalized);
      return valid ? user : null;
    }

    // Unsupported hash format (e.g. old PHPass $P$)
    return null;
  }

  async findById(id: number): Promise<User | null> {
    return this.userRepo.findOne({ where: { id } });
  }

  async updateLastLogin(id: number): Promise<void> {
    await this.userRepo.update(id, { last_updated: new Date() });
  }

  async updatePassword(id: number, newPassword: string): Promise<void> {
    const hashed = await bcrypt.hash(newPassword, 12);
    await this.userRepo.update(id, { password: hashed });
  }
}
