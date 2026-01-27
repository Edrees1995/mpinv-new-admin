import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
import {
  Property,
  Project,
  Developer,
  Community,
  Contact,
  User,
} from '../entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Property,
      Project,
      Developer,
      Community,
      Contact,
      User,
    ]),
  ],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}
