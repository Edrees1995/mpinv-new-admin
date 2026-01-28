import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubCommunitiesController } from './sub-communities.controller';
import { SubCommunitiesService } from './sub-communities.service';
import { SubCommunity, Community } from '../entities';

@Module({
  imports: [TypeOrmModule.forFeature([SubCommunity, Community])],
  controllers: [SubCommunitiesController],
  providers: [SubCommunitiesService],
  exports: [SubCommunitiesService],
})
export class SubCommunitiesModule {}
