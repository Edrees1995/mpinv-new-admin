import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApiController } from './api.controller';
import { ApiService } from './api.service';
import {
  OffplanProject,
  Developer,
  Community,
  SubCommunity,
  AdImage,
  AdPropertyType,
  Contact,
  Setting,
  Article,
  Faq,
  Banner,
  Team,
} from '../entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      OffplanProject,
      Developer,
      Community,
      SubCommunity,
      AdImage,
      AdPropertyType,
      Contact,
      Setting,
      Article,
      Faq,
      Banner,
      Team,
    ]),
  ],
  controllers: [ApiController],
  providers: [ApiService],
})
export class ApiModule {}
