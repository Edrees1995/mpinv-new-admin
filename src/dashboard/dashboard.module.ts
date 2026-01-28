import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
import {
  Project,
  Developer,
  Community,
  Contact,
} from '../entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Project,
      Developer,
      Community,
      Contact,
    ]),
  ],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}
