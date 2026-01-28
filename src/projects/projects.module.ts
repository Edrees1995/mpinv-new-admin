import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';
import { OffplanProject, Developer, Community, SubCommunity, Category, Subcategory, AdImage, AdPropertyType, AdFloorPlan, AdPaymentPlan } from '../entities';

@Module({
  imports: [TypeOrmModule.forFeature([OffplanProject, Developer, Community, SubCommunity, Category, Subcategory, AdImage, AdPropertyType, AdFloorPlan, AdPaymentPlan])],
  controllers: [ProjectsController],
  providers: [ProjectsService],
  exports: [ProjectsService],
})
export class ProjectsModule {}
