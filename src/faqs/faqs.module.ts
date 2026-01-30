import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FaqsController } from './faqs.controller';
import { FaqsService } from './faqs.service';
import { Article } from '../entities';

@Module({
  imports: [TypeOrmModule.forFeature([Article])],
  controllers: [FaqsController],
  providers: [FaqsService],
  exports: [FaqsService],
})
export class FaqsModule {}
